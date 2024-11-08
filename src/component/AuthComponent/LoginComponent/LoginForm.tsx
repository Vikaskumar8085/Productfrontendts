// LoginForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { loginapiservice } from '../../../Services/UserApiSerice';

interface LoginFormValues {
    Email: string;
    Password: string;
}

// Define validation schema with Yup
// const LoginSchema = Yup.object().shape({
//     Email: Yup.string().Email('Invalid Email format').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

const LoginForm: React.FC = () => {
    const formik = useFormik<LoginFormValues>({
        initialValues: {
            Email: '',
            Password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await loginapiservice(values);
                if (response.success) {
                    localStorage.setItem("token", response.result)
                    window.location.href = "/dashboard"
                }
            } catch (error: any) {
                console.log(error?.message)

            }
            // Handle form submission (e.g., send data to backend)
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-yellow-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="Email"
                            id="Email"
                            name="Email"
                            className={`w-full px-3 py-2 mt-1 border ${formik.touched.Email && formik.errors.Email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            value={formik.values.Email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.Email && formik.errors.Email && (
                            <div className="text-sm text-red-600">{formik.errors.Email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="Password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="Password"
                            id="Password"
                            name="Password"
                            className={`w-full px-3 py-2 mt-1 border ${formik.touched.Password && formik.errors.Password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            value={formik.values.Password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.Password && formik.errors.Password && (
                            <div className="text-sm text-red-600">{formik.errors.Password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center">
                    <Link to="/forgetpassword" className="text-sm text-blue-600 hover:underline">Forgot your password?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
