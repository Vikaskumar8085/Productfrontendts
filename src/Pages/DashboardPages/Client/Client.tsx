import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Reduxhook/hooks';
import { fetchclientapicall } from '../../../Services/Admin/Clientapiservice';
import { setclient } from '../../../Redux/ClientSlice/Clientslice';

interface clienttypes {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: number;
    Address: string;
    PostCode: number;
    GstNumber: string | number;
    Status: string | boolean;

}


const Client: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);
    const clientvalues = useAppSelector((state) => state.client.values)



    const dispatch = useAppDispatch();



    const formik = useFormik<clienttypes>({
        initialValues: {
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: 0,
            Address: "",
            PostCode: 0,
            GstNumber: "",
            Status: "",

        },
        onSubmit: (values) => {
            try {
                console.log(values, "values")

                formik.resetForm()

            } catch (error: any) {
                console.log(error?.message)
            }
        }

    })


    const fetchclients = async () => {
        try {
            const response: unknown | any = await fetchclientapicall();
            if (response.success) {
                dispatch(setclient(response.result))
            }

        } catch (error: any) {
            console.log(error?.message);

        }
    }

    React.useEffect(() => {
        fetchclients();
    }, [0])



    const ClientTable = clientvalues.map((item, index) => {
        console.log(item)
        const { id, FirstName, LastName, Email, Phone, GstNumber, Address, PostCode, Status } = item;
        return (
            <>
                <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2" key={index + 1}>{index + 1}</td>
                    <td className="px-4 py-2">{FirstName}</td>
                    <td className="px-4 py-2">{LastName}</td>
                    <td className="px-4 py-2">{Email}</td>
                    <td className="px-4 py-2">{Phone}</td>
                    <td className="px-4 py-2">{Address}</td>
                    <td className="px-4 py-2">{PostCode}</td>
                    <td className="px-4 py-2">{GstNumber}</td>
                    <td className="px-4 py-2 text-green-600">{Status}</td>
                </tr>
            </>
        )
    })



    return (
        <Layout>
            <Breadcrumb pageName='Client' />

            <section className='py-2 mb-3 bg-gray-300 w-full'>
                <button className='m-3 px-4 py-2 bg-white rounded-sm text-md ' onClick={() => setIsOpen(true)}>
                    Add Client
                </button>
            </section>

            {isOpen && <Modal setOpen={setIsOpen}>
                <div className='form'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-white shadow-md rounded-md"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="FirstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name:
                                </label>
                                <input
                                    {...formik.getFieldProps("FirstName")}
                                    name="FirstName"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    type="text" id="FirstName" />
                                {formik.touched.FirstName && formik.errors.FirstName && (
                                    <div className="text-red-500 text-sm">{formik.errors.FirstName}</div>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="LastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last Name:
                                </label>
                                <input
                                    id="LastName"
                                    type="text"
                                    {...formik.getFieldProps("LastName")}
                                    name="LastName"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {formik.touched.LastName && formik.errors.LastName && (
                                    <div className="text-red-500 text-sm">{formik.errors.LastName}</div>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                id="Email"
                                type="email"
                                {...formik.getFieldProps("Email")}
                                name="Email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {formik.touched.Email && formik.errors.Email && (
                                <div className="text-red-500 text-sm">{formik.errors.Email}</div>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
                                Phone:
                            </label>
                            <input
                                id="Phone"
                                type="phone"
                                {...formik.getFieldProps("Phone")}
                                name="Phone"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {formik.touched.Phone && formik.errors.Phone && (
                                <div className="text-red-500 text-sm">{formik.errors.Phone}</div>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="Address" className="block text-sm font-medium text-gray-700">
                                Address:
                            </label>
                            <input
                                id="Address"
                                type="text"
                                {...formik.getFieldProps("Address")}
                                name="Address"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {formik.touched.Address && formik.errors.Address && (
                                <div className="text-red-500 text-sm">{formik.errors.Address}</div>
                            )}
                        </div>

                        {/* Post Code */}
                        <div>
                            <label htmlFor="PostCode" className="block text-sm font-medium text-gray-700">
                                Post Code:
                            </label>
                            <input
                                id="PostCode"
                                type="text"
                                {...formik.getFieldProps("PostCode")}
                                name="PostCode"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {formik.touched.PostCode && formik.errors.PostCode && (
                                <div className="text-red-500 text-sm">{formik.errors.PostCode}</div>
                            )}
                        </div>

                        {/* GST Number */}
                        <div>
                            <label
                                htmlFor="GstNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                GST Number:
                            </label>
                            <input
                                id="GstNumber"
                                type="text"
                                {...formik.getFieldProps("GstNumber")}
                                name="GstNumber"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {formik.touched.GstNumber && formik.errors.GstNumber && (
                                <div className="text-red-500 text-sm">{formik.errors.GstNumber}</div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="Status" className="block text-sm font-medium text-gray-700">
                                Status:
                            </label>
                            <select
                                id="Status"
                                {...formik.getFieldProps("Status")}
                                name="Status"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option disabled>--select--</option>
                                <option value={"Active"}>Active</option>
                                <option value={"In Active"}>In Active</option>

                            </select>
                            {formik.touched.Status && formik.errors.Status && (
                                <div className="text-red-500 text-sm">{formik.errors.Status}</div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </Modal>}

            {/* table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white text-left text-sm text-gray-700">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="px-4 py-2 font-medium text-gray-900">ID</th>
                            <th className="px-4 py-2 font-medium text-gray-900">First Name</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Last Name</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Email</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Phone</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Address</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Post Code</th>
                            <th className="px-4 py-2 font-medium text-gray-900">GST Number</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Status</th>
                            <th className="px-4 py-2 font-medium text-gray-900">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {ClientTable}
                    </tbody>
                </table>
            </div>

        </Layout>
    )
}

export default Client
