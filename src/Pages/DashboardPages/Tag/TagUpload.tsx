import React, { useState } from 'react';
import { TfiDownload } from "react-icons/tfi";
import Layout from '../../../component/Layout/Layout';
import UploadForm from '../../../component/Admin/TagComponent/UploadForm';

const TagUpload: React.FC = () => {
    

    return (
        <Layout>

            <div className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200">
                <button  className="bg-white flex rounded-md justify-center items-center border rounded-md text-black-100 font-lighter text-md px-4 py-2" >
                    <i className='mx-3'><TfiDownload /></i>
                    Csv Format</button>
            </div>

            <h1 className="text-2xl font-semibold mb-4">Bulk Upload Tags</h1>
            <section className="flex flex-col flex justify-center h-full gap-6 items-center">
                
                {/* Form */}
                
            <UploadForm />
                
                {/* {Errors.length > 0 && (
    <div className="w-full max-w-3xl overflow-auto bg-white shadow-lg rounded-lg p-6 max-h-[80vh] max-w-full">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Errors</h2> {
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th className="border px-4 py-2 text-gray-600 font-semibold bg-gray-100">
                        Error
                    </th>
                </tr>
            </thead>
            <tbody>
                {Errors.map((error, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-red-600"> 
                            {error}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)} */}

            </section>
        </Layout>

    );
};

export default TagUpload;
