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

                <section className='p-4 bg-gray-300 w-full relative block overflow-x-hidden mb-3'>
                    <button className='m-3 px-4 py-2 bg-white rounded-sm text-md ' onClick={() => setIsOpen(true)}>
                        add Reason
                    </button>
                </section>
                {isOpen && <Modal setOpen={setIsOpen}>
                    <div className="form">
                        <form >
                            <div className="form-title mb-3">
                                <h3 className='text-1xl'>Add Reason</h3>
                            </div>

                            <div className='mb-3 w-full'>
                                <label htmlFor="Name" className='mb-2 min-w-full '>Name</label>
                                <input type="text" {...formik.getFieldProps("reason")} name="" id="" />

                            </div>
                            <div className='w-full '>
                                <button type='submit' className='bg-blue-400 text-white text-md capitalize  w-full py-2 px-4 rounded-md '>submit</button>
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