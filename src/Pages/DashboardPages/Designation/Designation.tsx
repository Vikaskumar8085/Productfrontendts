import React from 'react';
import Layout from '../../../component/Layout/Layout';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import { addDesignationapicall, fetchdesignationapicall, removedesignationapicall, updatedesignationapicall } from '../../../Services/Designation';

interface DesignationType {
    id?: number;
    title: string;
}

const Designation: React.FC = () => {
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const [isdata, setData] = React.useState<[]>([]);
    const [editDesignation, setEditDesignation] = React.useState<any | null>(null);  // State to hold the designation being edited

    const formik = useFormik<DesignationType>({
        initialValues: {
            title: ''
        },
        onSubmit: async (value) => {
            try {
                if (editDesignation) {
                    // If editDesignation is set, we are editing an existing designation
                    const response:any = await updatedesignationapicall(editDesignation.id, value);
                    if (response.success) {
                        fetchdesignation();
                        setOpen(false);
                        formik.resetForm();
                    }
                } else {
                    // Otherwise, adding a new designation
                    const response = await addDesignationapicall(value);
                    if (response.success) {
                        fetchdesignation();
                        setOpen(false);
                        formik.resetForm();
                    }
                }
            } catch (error: any) {
                console.log(error?.message);
                setOpen(false);
            }
        }
    });

    const fetchdesignation = async () => {
        try {
            const response = await fetchdesignationapicall();
            if (response.success) {
                setData(response.result);
            }
        } catch (error: any) {
            console.log(error?.message, "error message");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await removedesignationapicall(id);
            if (response.success) {
                fetchdesignation();
            }
        } catch (error: any) {
            console.log(error?.message, "error message");
        }
    };

    const handleEdit = (designation: any) => {
        setEditDesignation(designation);  // Set the designation to be edited
        formik.setValues({ title: designation.title });  // Pre-fill the form with current data
        setOpen(true);  // Open the modal for editing
    };

    React.useEffect(() => {
        fetchdesignation();
    }, []);

    return (
        <Layout>
            <Breadcrumb pageName="Designation" />
            <div className="designation_header mb-2">
                <button
                    onClick={() => {
                        setEditDesignation(null);  // Clear any previous designation data
                        setOpen(true);  // Open the modal to add a new designation
                    }}
                    className="px-4 py-2 bg-yellow-400 border capitalize"
                >
                    Add Designation
                </button>
            </div>

            {/* Modal for Add/Edit Designation */}
            {isOpen && (
                <Modal setOpen={setOpen}>
                    <div className='w-[300px] md:w-[300px]'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 text-gray-700 font-medium text-lg" htmlFor="designation">
                                    {editDesignation ? 'Edit Designation' : 'Add Designation'}
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
                                >
                                    {editDesignation ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}

            {/* Designation Table */}
            <div className="overflow-x-auto max-h-[80vh] overflow-y-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isdata?.map((item, index) => {
                            const { title, id } = item;
                            return (
                                <tr key={id} className="border-b last:border-none hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <button
                                            className="px-4 py-2 bg-yellow-400 border capitalize"
                                            onClick={() => handleEdit(item)}  // Open the modal for editing
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-400 border capitalize"
                                            onClick={() => handleDelete(id)}  // Delete the designation
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Designation;
