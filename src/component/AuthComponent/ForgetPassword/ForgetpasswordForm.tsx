import React from 'react'
import { useFormik } from 'formik';
import { forgetpasswordapicall } from '../../../Services/UserApiSerice';

interface ForgetFormValue {
    Email: string
}


const ForgetpasswordForm: React.FC = () => {

    const formik = useFormik<ForgetFormValue>({
        initialValues: {
            Email: "",
        },
        onSubmit: async (values) => {
            try {
                console.log(values, "values")
                const response = await forgetpasswordapicall(values);
                if (response.success) {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
    })


    return (
        <div className="flex items-center justify-center min-h-screen bg-yellow-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-1xl font-bold text-center text-gray-600">Forget Password</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4" >
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

                    <div>
                        <button className="w-full px-4 py-2 font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ForgetpasswordForm
