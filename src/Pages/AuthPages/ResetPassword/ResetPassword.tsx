// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useParams } from "react-router-dom";
// import * as Yup from "yup";
// import { resetpasswordapicall } from "../../../Services/UserApiSerice";
// import apiInstance from '../../../Services/apiservice/apiInstance';

// interface FormValue {
//     password: string;
//     confirmPassword: string;
// }


// const ResetPassword: React.FC = () => {
//     const { resetToken } = useParams<{ resetToken: string }>(); // Use string type
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//     const [apiResponse, setApiResponse] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     console.log(resetToken, "resetToken")
//     // Validation schema
//     const validationSchema = Yup.object({
//         password: Yup.string()
//             .min(8, "Password must be at least 8 characters")
//             .required("Password is required"),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref("password")], "Passwords must match")
//             .required("Confirm Password is required"),
//     });

//     // Formik setup
//     const formik = useFormik<FormValue>({
//         initialValues: {
//             password: "",
//             confirmPassword: "",
//         },
//         validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 const formvalue = new FormData();
//                 formvalue.append("password", values.password);


//                 const response = await apiInstance.post(`/user/reset-password/${resetToken}`, formvalue)
//                 console.log(response)

//             } catch (error: any) {
//                 console.log(error?.message)

//             }
//         },
//     });

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form
//                 onSubmit={formik.handleSubmit}
//                 className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
//             >
//                 <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//                     Reset Password
//                 </h2>

//                 {/* Password Field */}
//                 <div className="mb-4 relative">
//                     <label
//                         htmlFor="password"
//                         className="block text-sm font-medium text-gray-600"
//                     >
//                         New Password
//                     </label>
//                     <input
//                         id="password"
//                         type={passwordVisible ? "text" : "password"}
//                         className={`mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border ${formik.touched.password && formik.errors.password
//                             ? "border-red-500"
//                             : "border-gray-300"
//                             } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
//                         {...formik.getFieldProps("password")}
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setPasswordVisible(!passwordVisible)}
//                         className="absolute top-8 right-4 text-gray-500"
//                     >
//                         {passwordVisible ? "Hide" : "Show"}
//                     </button>
//                     {formik.touched.password && formik.errors.password && (
//                         <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
//                     )}
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div className="mb-4 relative">
//                     <label
//                         htmlFor="confirmPassword"
//                         className="block text-sm font-medium text-gray-600"
//                     >
//                         Confirm Password
//                     </label>
//                     <input
//                         id="confirmPassword"
//                         type={confirmPasswordVisible ? "text" : "password"}
//                         className={`mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border ${formik.touched.confirmPassword && formik.errors.confirmPassword
//                             ? "border-red-500"
//                             : "border-gray-300"
//                             } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
//                         {...formik.getFieldProps("confirmPassword")}
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                         className="absolute top-8 right-4 text-gray-500"
//                     >
//                         {confirmPasswordVisible ? "Hide" : "Show"}
//                     </button>
//                     {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                         <p className="mt-2 text-sm text-red-500">
//                             {formik.errors.confirmPassword}
//                         </p>
//                     )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className={`w-full px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
//                         }`}
//                     disabled={loading}
//                 >
//                     {loading ? "Submitting..." : "Reset Password"}
//                 </button>

//                 {/* API Response */}
//                 {apiResponse && (
//                     <p
//                         className={`mt-4 text-center text-sm ${apiResponse.includes("successfully")
//                             ? "text-green-500"
//                             : "text-red-500"
//                             }`}
//                     >
//                         {apiResponse}
//                     </p>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default ResetPassword;


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
                    Password Form
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
