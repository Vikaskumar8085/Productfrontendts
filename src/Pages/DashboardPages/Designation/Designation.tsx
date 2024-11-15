import React from 'react';
import Layout from '../../../component/Layout/Layout';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import { addDesignationapicall, fetchdesignationapicall } from '../../../Services/Admin/Designation';
import useEffect from 'react';


interface DesigantionType {
    title: string
}
const Designation: React.FC = () => {
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const [isdata, setData] = React.useState<[]>([]);


    const formik = useFormik<DesigantionType>({
        initialValues: {
            title: ''
        },
        onSubmit: async (value) => {
            try {
                const response = await addDesignationapicall(value)
                if (response) {
                    console.log(response)
                    setOpen(false)
                    fetchdesignation()
                }
                setOpen(false)
                formik.resetForm()
            } catch (error: any) {
                setOpen(false)
                console.log(error?.message)

            }
        }
    })


    const fetchdesignation = async () => {
        try {
            const response = await fetchdesignationapicall();
            if (response.success) {
                setData(response.result)
            }
        } catch (error: any) {
            console.log(error?.message, "error message")
        }
    }

    React.useEffect(() => {
        fetchdesignation();
    }, [0])
    return (
        <Layout>
            <Breadcrumb pageName="Designation" />
            <div className="designation_header mb-2">
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-yellow-400 border capitalize"
                >                    Add Designation
                </button>
            </div>
            {isOpen && (
                <Modal setOpen={setOpen}>
                    <div className='w-[300px] md:w-[300px]'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 text-gray-700 font-medium text-lg" htmlFor="designation">
                                    Add Designation
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("title")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    name="title"
                                    id="title"
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

                </Modal>
            )}


            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                ID
                            </th>    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Title
                            </th>    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>



                        </tr>
                    </thead>

                    {isdata?.map((item, index) => {
                        const { title } = item;
                        return (
                            <tbody>
                                <tr className="border-b last:border-none hover:bg-gray-50">
                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">

                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            </div>

        </Layout>
    );
};

export default Designation;
