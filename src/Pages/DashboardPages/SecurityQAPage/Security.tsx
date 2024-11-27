import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb'
import Modal from '../../../Common/Modal/Modal'
import { useFormik } from 'formik'
import { createsecurityapicall, fetchsecurityapicall, removesecurityapicall } from '../../../Services/Admin/SecurityApiService/Securityapiservice'
import { useAppDispatch, useAppSelector } from '../../../Hooks/Reduxhook/hooks';
import { setAddSecurity, setremovesecurity, setSecurity } from '../../../Redux/securityslice'
import { MdDelete, MdOutlineEdit } from 'react-icons/md'
import DeleteDialog from '../../../Common/DeleteDialog/DeleteDialog'
import toast from 'react-hot-toast'

const Security: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = React.useState<boolean | null>(false);
    const [editReasonId, setEditReasonId] = React.useState<number | null>(null); // state for edit mode
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false); // flag for edit mode
    const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [isId, setId] = React.useState<number | null>(null);
    const securitydata = useAppSelector((state) => state.security.value)

    let formik = useFormik({
        initialValues: {
            Question: "",
            Answer: ""
        },
        onSubmit: async (values) => {
            try {
                let response = await createsecurityapicall(values);
                console.log(response, "response")
                if (response.success) {
                    dispatch(setAddSecurity(response.result))
                    formik.resetForm();
                    setIsOpen(false)

                }

            } catch (error: any) {
                console.log(error)

            }
        }
    })


    const fetchsecuritydata = async () => {
        try {
            const response: any = await fetchsecurityapicall();
            if (response.success) {
                dispatch(setSecurity(response.result))
            }

        } catch (error: any) {
            console.log(error?.message)
        }
    }


    React.useEffect(() => {
        fetchsecuritydata();
    }, [0])


    const handleEdit = (value: any) => {
        console.log(value)
    }

    const handleDelete = async (id: any) => {
        try {
            const response: any = await removesecurityapicall(id)
            if (response.success) {
                dispatch(setremovesecurity(response.result))
                toast.success(response.message)
            }
        } catch (error: any) {
            console.log(error.message)
        }
        setDialogOpen(false)


    }

    const securitytable = securitydata.map((item, index) => {
        const { id, Question, Answer } = item;

        return (
            <>

                <tbody>
                    <tr key={id}>
                        <td key={index}>{index + 1}</td>
                        <td>{Question}</td>
                        <td>{Answer}</td>
                        <td>
                            <div className="flex gap-2">
                                {/* <MdOutlineEdit
                                    className="text-blue-500 cursor-pointer text-2xl"
                                    onClick={() => handleEdit(id)}
                                /> */}
                                <div className="flex items-center justify-center bg-gray-100">
                                    <MdDelete
                                        className="text-red-500 cursor-pointer text-2xl"

                                        onClick={() => { setId(id); setDialogOpen(true) }}
                                    />
                                    <DeleteDialog
                                        isOpen={isDialogOpen}
                                        onClose={() => setDialogOpen(false)}
                                        onDelete={() => handleDelete(isId)} />
                                </div>

                            </div>
                        </td>
                    </tr>

                </tbody>

            </>

        )
    })


    return (
        <Layout >
            <Breadcrumb pageName={"Security"} />









            <section className="p-2 bg-gray-300 w-full relative block overflow-x-hidden mb-3">
                <button
                    className="m-3 px-4 py-2 bg-white rounded-sm text-md"
                    onClick={() => {
                        setIsOpen(true);
                        setIsEditMode(false);
                        formik.resetForm();
                    }}
                >
                    Add Security Q&A
                </button>
            </section>

            {isOpen && (
                <Modal setOpen={setIsOpen}>
                    <div className="form bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
                        <form onSubmit={formik.handleSubmit}>
                            {/* Form Title */}
                            <div className="form-title mb-4 text-center">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {isEditMode ? "Edit Security Q&A" : "Add Security Q&A"}
                                </h3>
                            </div>

                            {/* Question Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="Question"
                                    className="block text-sm font-medium text-gray-600 mb-2"
                                >
                                    Question
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("Question")}
                                    name="Question"
                                    id="Question"
                                    placeholder="Enter your Question"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                                />
                            </div>
                            {/* Answer */}

                            <div className="mb-4">
                                <label
                                    htmlFor="Answer"
                                    className="block text-sm font-medium text-gray-600 mb-2"
                                >
                                    Answer
                                </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("Answer")}
                                    name="Answer"
                                    id="Answer"
                                    placeholder="Enter Your Answer"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                                />
                            </div>
                            {/* Submit Button */}
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    {isEditMode ? "Update Reason" : "Submit"}
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
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Question
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Answer
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {securitytable}

                </table>
            </div>
        </Layout>
    )
}

export default Security
