import { useFormik } from 'formik';
import React, { useState } from 'react';
import { registerapiservice } from '../../../Services/UserApiSerice';


interface FormValues {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Password: string;
}

const SingupForm: React.FC = () => {

    const formik = useFormik<FormValues>({
        initialValues: {
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Password: '',
        },
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await registerapiservice(values);
                console.log(response)
                if (response.success) {
                    alert("user registration complete successfully")
                }
            } catch (error: any) {
                console.error('Registration failed:', error);
                // Handle error (e.g., display error message)
                setErrors({ Email: 'Registration failed. Please try again.' }); // Example error message

            } finally {
                setSubmitting(false)
            }
        },
    });

    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-yellow-900">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Sign up</h2>
                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-600">First Name</label>
                            <input
                                type="text"
                                id="FirstName"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...formik.getFieldProps('FirstName')}
                            />
                            {formik.touched.FirstName && formik.errors.FirstName ? (
                                <div className="text-red-500 text-sm">{formik.errors.FirstName}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-600">Last Name</label>
                            <input
                                type="text"
                                id="LastName"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...formik.getFieldProps('LastName')}
                            />
                            {formik.touched.LastName && formik.errors.LastName ? (
                                <div className="text-red-500 text-sm">{formik.errors.LastName}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="Email"
                                id="Email"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...formik.getFieldProps('Email')}
                            />
                            {formik.touched.Email && formik.errors.Email ? (
                                <div className="text-red-500 text-sm">{formik.errors.Email}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...formik.getFieldProps('Phone')}
                            />
                            {formik.touched.Phone && formik.errors.Phone ? (
                                <div className="text-red-500 text-sm">{formik.errors.Phone}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...formik.getFieldProps('Password')}
                            />
                            {formik.touched.Password && formik.errors.Password ? (
                                <div className="text-red-500 text-sm">{formik.errors.Password}</div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SingupForm