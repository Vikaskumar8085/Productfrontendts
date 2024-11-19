import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import { createregionapicall, fetchregionapicall } from '../../../Services/Admin/Regionapiservice/regionapiserver';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Reduxhook/hooks';
import { setaddRegionitems, setRegionitems } from '../../../Redux/Region/Regionslice';


interface regionType {
    Name: string;
}

const Region = () => {
    const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);
    const regionfetch = useAppSelector(state => state.region.value)
    console.log(regionfetch, "region fetch")
    const dispatch = useAppDispatch();
    const formik = useFormik<regionType>({
        initialValues: {
            Name: ""
        },
        onSubmit: async (value) => {
            try {
                const response: any = await createregionapicall(value);
                console.log(response)
                if (response.success) {
                    dispatch(setaddRegionitems(response.result))
                    setIsOpen(false)
                    getRegion()
                }
                formik.resetForm();
            } catch (error: any) {
                console.log(error?.message)

            }
        }
    })


    const getRegion = async () => {
        try {
            const repsonse: unknown | any = await fetchregionapicall();
            if (repsonse.success) {
                dispatch(setRegionitems(repsonse.result))

            }
        } catch (error: any) {
            console.log(error?.message)

        }
    }

    React.useEffect(() => {
        getRegion();
    }, [0])


 

    return (
        <Layout>
            <Breadcrumb pageName='Region' />

            <section className='p-4 bg-gray-300 w-full relative block overflow-x-hidden mb-3'>
                <button className='bg-white px-4 py-2 b rounded-md' onClick={() => setIsOpen(true)}> Add Region</button>
            </section>

            {isOpen && <Modal setOpen={setIsOpen}>
                <div className="form bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
                    <form onSubmit={formik.handleSubmit}>

                        <div className="form-title mb-4 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800">Add Region</h3>
                        </div>

                        {/* Name Field */}
                        <div className="flex flex-col mb-6">
                            <label
                                htmlFor="Name"
                                className="mb-2 text-gray-700 font-medium text-base"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("Name")}
                                name="Name"
                                id="Name"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white text-sm font-medium uppercase py-2 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                Name
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {regionfetch.length > 0 && regionfetch.map((item: any, index: number) => (
                            <tr key={index} className='border-b border-gray-200'>
                                <td>{item.id}</td>
                                <td>{item.Name}</td>
                                <td>
                                    <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>


            {/* table */}
        </Layout>
    )
}

export default Region

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
