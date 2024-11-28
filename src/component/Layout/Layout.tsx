import React, { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { TfiAlignLeft, TfiAlignRight } from "react-icons/tfi";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../Hooks/Reduxhook/hooks";
import { getUserapiCall } from "../../Services/UserApiSerice";
import { setUserRole } from "../../Redux/UserSlice";
import toast from "react-hot-toast";
import {fetchsecurityapicall} from '../../Services/Admin/SecurityApiService/Securityapiservice';
import {setSecurity} from '../../Redux/securityslice';
import { FieldArray, FormikErrors, FormikProvider, useFormik } from "formik";
import {createclientsecurityapicall} from '../../Services/Admin/Clientsecurityapiservices/ClientSecurityapiservices';
import * as Yup from "yup";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collable, setcollable] = useState<boolean>(false);
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const Roletype: any = useAppSelector((state) => state.user.Role);
  const questions: Array<{ id: string; questionText: string }> =
    useAppSelector((state) => state.security.value) || [];
//get the hasAnswered value from the local storage
    const hasAnswered = localStorage.getItem("hasAnswered");
    
  const getUserRoleType = async () => {
    try {
      const response: any = await getUserapiCall();
      if (response.success) {
        dispatch(setUserRole(response.result));
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getUserRoleType();

if(hasAnswered === "false"){
      //delay the modal for 5 seconds
      fetchsecuritydata();
        setTimeout(() => {
            setShowSecurityModal(true);
        }, 5000);
    }
    

  }, [0]);
  const handleSkip = () => {
    //update local storage value to true
    localStorage.setItem("hasAnswered", "true");
    setShowSecurityModal(false);
  }
  const fetchsecuritydata = async () => {
    try {
      const response: any = await fetchsecurityapicall();
      if (response.success) {
        dispatch(setSecurity(response.result));
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
  const formik = useFormik<{
    questionsAndAnswers: Array<{ questionId: string; answer: string }>;
  }>({
    initialValues: {
      questionsAndAnswers: [
        { questionId: "", answer: "" }, // Placeholder for at least one question-answer pair
      ],
    },
    validationSchema: Yup.object({
      questionsAndAnswers: Yup.array()
        .of(
          Yup.object({
            questionId: Yup.string().required("Please select a question"),
            answer: Yup.string().required("Answer is required"),
          })
        )
        .min(1, "Add at least one security question"),
    }),
    onSubmit: async (values) => {
        try {
      const responses:any = await createclientsecurityapicall(values);
      console.log(responses, "responses");
        if (responses.success) {
            toast.success("Security questions added successfully");
            setShowSecurityModal(false);
            //update local storage value to true
            localStorage.setItem("hasAnswered", "true");
        }
        }
        catch (error: any) {
            toast.error("An error occurred");
          console.error(error.message);
        }
      
    },
  });

  return (
    <>
      <div className="flex block">
        <Sidebar collable={collable} Roletype={Roletype} />
        <div className="main block w-screen overflow-hidden h-screen">
          <Header collable={collable} setcollable={setcollable} />
          <div className="content p-4 min-h-screen">{children}</div>
        </div>
      </div>

      {/* Modal */}
      {showSecurityModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Set Security Questions</h2>

            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <FieldArray name="questionsAndAnswers">
                  {({ remove, push }) => (
                    <>
                      {formik.values.questionsAndAnswers.map((_, index) => (
                        <div key={index} className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Select a Question
                          </label>
                          <select
                            name={`questionsAndAnswers[${index}].questionId`}
                            className="w-full p-2 border rounded mb-2"
                            value={
                              formik.values.questionsAndAnswers[index]
                                .questionId
                            }
                            onChange={formik.handleChange}
                          >
                            <option value="">-- Select a Question --</option>
                            {questions.map((q) => (
                              <option key={q.id} value={q.id}>
                                {q.questionText}
                              </option>
                            ))}
                          </select>
                          {formik.touched.questionsAndAnswers?.[index]
                            ?.questionId &&
                            formik.errors.questionsAndAnswers?.[index] && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    formik.errors.questionsAndAnswers[
                                      index
                                    ] as FormikErrors<{
                                      questionId: string;
                                      answer: string;
                                    }>
                                  ).questionId
                                }
                              </div>
                            )}

                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Your Answer
                          </label>
                          <input
                            type="text"
                            name={`questionsAndAnswers[${index}].answer`}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Enter your answer"
                            value={
                              formik.values.questionsAndAnswers[index].answer
                            }
                            onChange={formik.handleChange}
                          />
                         

                          <button
                            type="button"
                            className="text-red-500 text-sm mt-2"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                        onClick={() => push({ questionId: "", answer: "" })}
                      >
                        Add Another Question
                      </button>
                    </>
                  )}
                </FieldArray>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowSecurityModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
