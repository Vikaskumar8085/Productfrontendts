import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';

interface regionType {
    Name: string;
}

const Region = () => {
    const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);

    const formik = useFormik<regionType>({
        initialValues: {
            Name: ""
        },
        onSubmit: async (value) => {
            try {
                console.log(value)
                formik.resetForm();
            } catch (error: any) {
                console.log(error?.message)

            }
        }
    })

    return (
        <Layout>
            <Breadcrumb pageName='Region' />

            <section className='p-4 bg-gray-300 w-full relative block overflow-x-hidden mb-3'>
                <button className='bg-white px-4 py-2 b rounded-md' onClick={() => setIsOpen(true)}> Add Region</button>
            </section>

            {isOpen && <Modal setOpen={setIsOpen}>
                <div className="form">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label className="mb-2 text-gray-700 font-medium text-lg" htmlFor="designation">
                                Name
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("Name")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="Name"
                                id="Name"
                            />
                        </div>
                        <div className="flex">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white text-sm font-semibold uppercase py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >   Submit
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
                                Name
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
    )
}

export default Region