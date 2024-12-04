import React, { useState } from 'react';
import { useFormik } from 'formik';
import { forgetpasswordapicall } from '../../../Services/UserApiSerice/index';
import { checkclientsecurityapicall,verifyanswerapicall } from '../../../Services/Admin/Clientsecurityapiservices/ClientSecurityapiservices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


interface ForgetFormValue {
    Email: string;
}

interface SecurityQuestion {
    id: number;
    questionText: string;
}

const ForgetpasswordForm: React.FC = () => {
    const navigate = useNavigate();
    const [emailValidated, setEmailValidated] = useState(false); // Track if email is validated
    const [verificationMethod, setVerificationMethod] = useState<null | 'email' | 'security'>(null);
    const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]); // Store security questions

    const formik = useFormik<ForgetFormValue>({
        initialValues: {
            Email: "",
        },
        onSubmit: async (values) => {
            try {
                if (verificationMethod === 'email') {
                    const response: any = await forgetpasswordapicall(values);
                    if (response.success) {
                        toast.success(response.message);
                    }
                }
            } catch (error:any) {
                console.error(error);
                toast.error(error.response.data.message);
            }
        },
    });

    const securityFormik = useFormik({  
        initialValues: {},
        onSubmit: async (values) => {
            try {
                const email = formik.values.Email;

      // Prepare the payload for the API
      const answersPayload = Object.entries(values).map(([questionId, answer]) => ({
        questionId: Number(questionId),
        answer,
      }));

      const payload = {
        Email: email,
        answers: answersPayload,
      };
      const response: any = await verifyanswerapicall(payload);
      if(response.success){
        toast.success("Answers submitted successfully!")
        window.location.href = `/resetpassword/${response.result}`;
        }
        else{
            toast.error("Invalid Answers")
        }
              
                
            } catch (error) {
                navigate("/login");
                console.error(error);
                toast.error("Failed to validate security answers.");
            }
        },
    });

    const validateEmail = async () => {
        const email = formik.values.Email;
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        try {
            const response: any = await forgetpasswordapicall({ Email: email });
            if (response.success) {
                setEmailValidated(true);
                toast.success("Email validated successfully!"+response.message);
                navigate("/login");
            } else {
                toast.error("Invalid email. Please try again.");
            }
        } catch (error:any) {
            navigate("/login");
            console.error(error);
            toast.error("Invalid email. Please try again.");
            
        }
    };

    const fetchSecurityQuestions = async () => {
        try {
            const email = formik.values.Email;
            console.log("Email:", email);
            if (!email) {
                toast.error("Please enter your email.");
                return;
            }

            const response: any = await checkclientsecurityapicall({ Email: email });
            if (response.success) {
                const questions = response.result.map((q: any) => ({
                    id: q.securityQuestion.id,
                    questionText: q.securityQuestion.questionText,
                }));
                setSecurityQuestions(questions);

                // Initialize formik's initial values with empty answers
                const initialValues = questions.reduce(
                    (acc: any, q: SecurityQuestion) => ({ ...acc, [`${q.id}`]: "" }),
                    {}
                );
                securityFormik.setValues(initialValues);

                
            } else {
                toast.error(response.message);
            }
        } catch (error:any) {
            navigate("/login"); 
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    const handleVerificationChoice = (choice: 'email' | 'security') => {
        setVerificationMethod(choice);
        if (choice === 'security') {
            fetchSecurityQuestions();
        } else if (choice === 'email') {
            validateEmail();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-yellow-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-1xl font-bold text-center text-gray-600">Forget Password</h2>

                {!emailValidated ? (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                {...formik.getFieldProps('Email')}
                            />
                            {formik.touched.Email && formik.errors.Email && (
                                <div className="text-sm text-red-600">{formik.errors.Email}</div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => setEmailValidated(true)}
                            className="w-full px-4 py-2 font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Next
                        </button>
                    </div>
                ) : verificationMethod === null ? (
                    <div className="space-y-4">
                        <p className="text-center text-gray-600">Choose a verification method:</p>
                        <button
                            onClick={() => handleVerificationChoice('email')}
                            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Verify via Email
                        </button>
                        <button
                            onClick={() => handleVerificationChoice('security')}
                            className="w-full px-4 py-2 font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Answer Security Questions
                        </button>
                    </div>
                ) : verificationMethod === 'security' ? (
                    <form onSubmit={securityFormik.handleSubmit} className="space-y-4">
                        {securityQuestions.map((q) => (
                            <div key={q.id}>
                                <label htmlFor={`${q.id}`} className="block text-sm font-medium text-gray-600">
                                    {q.questionText}
                                </label>
                                <input
                                    type="text"
                                    id={`${q.id}`}
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...securityFormik.getFieldProps(`${q.id}`)}
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit Answers
                        </button>
                    </form>
                ) : null}
            </div>
        </div>
    );
};

export default ForgetpasswordForm;
