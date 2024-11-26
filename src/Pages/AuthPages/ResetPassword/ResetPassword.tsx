import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiInstance from "../../../Services/apiservice/apiInstance";
import { useParams } from "react-router-dom";
import { resetpasswordapicall } from "../../../Services/UserApiSerice";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
    const { resetToken } = useParams()
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Validation schema
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema,
        onSubmit: async (values: any) => {
            try {
                const response: any = await apiInstance.post(`/user/reset-password/${resetToken}`, values)
                console.log(response)
                if (response.status === 200) {
                    toast.success(response.data.message)
                    formik.resetForm();
                    window.location.href = "/login"

                }
            } catch (error: any) {
                console.log(error?.message)
            }




        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Reset Password
                </h2>

                {/* Password Field */}
                <div className="mb-4 relative">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        className={`mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border ${formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                        {...formik.getFieldProps("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute top-8 right-4 text-gray-500"
                    >
                        {passwordVisible ? "Hide" : "Show"}
                    </button>
                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
