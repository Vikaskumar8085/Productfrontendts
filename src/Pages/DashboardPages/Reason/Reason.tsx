import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';

const Reason: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<boolean | null>(false);

    const formik = useFormik({
        initialValues: {

        },
        onSubmit: async (value) => {
            try {
                console.log(value)
                formik.resetForm();
                setIsOpen(false)
            } catch (error: any) {
                console.log(error?.message)
            }
        }
    })

    return (

        <>
            <Layout>
                <Breadcrumb pageName='Reason' />

                <section className='p-2 bg-gray-300 w-full relative block overflow-x-hidden mb-3'>
                    <button className='m-3 px-4 py-2 bg-white rounded-sm text-md ' onClick={() => setIsOpen(true)}>
                        add Reason
                    </button>
                </section>
                {isOpen && <Modal setOpen={setIsOpen}>
                    <div className="form bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
                        <form onSubmit={formik.handleSubmit}>
                            {/* Form Title */}
                            <div className="form-title mb-4 text-center">
                                <h3 className="text-2xl font-semibold text-gray-800">Add Reason</h3>
                            </div>

                            {/* Name Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="reason"
                                    className="block text-sm font-medium text-gray-600 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("reason")}
                                    name="reason"
                                    id="reason"
                                    placeholder="Enter reason"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                </Modal>}


                {/* table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Reason Name
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>


                        </tbody>
                    </table>
                </div>
                {/* table */}
            </Layout>
        </>



    )
}

export default Reason