import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import { createtagapicall, fetchtagapicall } from '../../../Services/Admin/Tagapiservice/tagapiservece';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Reduxhook/hooks';
import { setaddItems, setTagitems } from '../../../Redux/TagSlice/Tagslice';
import { TfiDownload } from 'react-icons/tfi';
import UploadForm from '../../../component/Admin/TagComponent/UploadForm';

interface tagTypes {
    Tag_Name: string | any;
}
function Tag() {
    const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);
    const [ismodelOpen, setIsModelOpen] = React.useState<Boolean | null>(false);
    const dispatch = useAppDispatch();
    const tagvalue = useAppSelector(state => state.tag.value);


    const formik = useFormik<tagTypes>({
        initialValues: {
            Tag_Name: ''
        },
        onSubmit: async (value: any) => {
            try {
                const response: unknown | any = await createtagapicall(value);
                if (response.success) {
                    dispatch(setaddItems(response.result))
                    setIsOpen(false)
                    formik.resetForm();
                }
            } catch (error: any) {
                console.log(error?.message)
                setIsOpen(false)
                formik.resetForm();
            }
        }

    })



    // fetch tag


    const fetchtag = async () => {
        try {
            const response: any = await fetchtagapicall();
            if (response.success) {
                dispatch(setTagitems(response.result))
            }

        } catch (error: any) {
            console.log("fetch tag error", error?.message)
        }
    }


    React.useEffect(() => {
        fetchtag()
    }, [0])




    // tag csv template


    const csvtemplate = async () => {
        try {
            // Fetch the CSV template from your API
            const response = await fetch('http://localhost:8000/api/tag/download-tag-template', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/csv',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Convert response to blob
            const blob = await response.blob();

            // Create a link and trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Tag-template.csv'; // Set the desired file name
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (error: any) {
            console.error('Error downloading the template:', error);
        }
    }

    // tag csv template




    const tagsTable = tagvalue.map((item, index) => {

        const { id, Tag_Name } = item

        return (
            <>
                <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2" key={index}>{index + 1}</td>
                    <td className="px-4 py-2" >{Tag_Name}</td>
                    <td className="px-4 py-2" >
                        <button onClick={() => console.log(id)} value={id}>delete</button></td>

                </tr>


            </>
        )
    })







    return (
        <Layout>
            <Breadcrumb pageName='Tag' />

            <section className='p-4 bg-gray-300 w-full flex gap-4 flex-row relative block overflow-x-hidden mb-3'>
                <button className='bg-white px-4 py-2 b rounded-md' onClick={() => setIsOpen(true)}> Add Tag</button>
                <button onClick={csvtemplate} className='bg-white flex rounded-md justify-center items-center border rounded-md text-black-100  font-lighter text-md px-4 py-2 ' >
                    <i className='mx-3'><TfiDownload /></i>
                    Csv Formate</button>
                <button className='bg-white px-4 py-2 rounded-md text-1xl capitalize' onClick={() => setIsModelOpen(true)}>upload csv</button>
            </section>
            {/* form modal for tag */}
            {isOpen && <Modal setOpen={setIsOpen}>
                <div className="form">

                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label className="mb-2 text-gray-700 font-medium text-lg" htmlFor="designation">
                                Tag
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("Tag_Name")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="Tag_Name"
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
            {/* form modal for tag */}

            {ismodelOpen && <Modal setOpen={setIsModelOpen}>
                <UploadForm /></Modal>}

            {/* table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Tag Name
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {tagsTable}
                    </tbody>
                </table>
            </div>

            {/* table */}
        </Layout>
    )
}

export default Tag