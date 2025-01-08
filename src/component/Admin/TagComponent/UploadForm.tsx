import { FormikErrors, FormikHelpers, useFormik } from 'formik'
import Papa from 'papaparse';
import React, { useState } from 'react'
import { uploadcsvapicall } from '../../../Services/Admin/Tagapiservice/tagapiservece';
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import { setTagitems, setaddItems } from '../../../Redux/TagSlice/Tagslice';
import toast from "react-hot-toast";
interface FormValues {
    file: File | null;
}

function UploadForm() {

    const [csvData, setCsvData] = useState<string[][] | null>(null);
    const [Errors, setErrors] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const tagvalue = useAppSelector((state) => state.tag.value);
    // formik 
    const formik = useFormik<FormValues>({
        initialValues: {
            file: null,
        },
        validate: (values) => {
            const errors: FormikErrors<FormValues> = {};
            if (!values.file) {
                errors.file = 'A CSV file is required';
            } else if ((values.file as File).type !== 'text/csv') {
                errors.file = 'Only CSV files are accepted';
            }
            return errors;
        },
        onSubmit: async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
            try {
                const formdata: any | null = new FormData();
                formdata.append("file", values.file);
                const response: any = await uploadcsvapicall(formdata);
                if (response.success) {
                    
                    //reset form and set csv data to null
                    resetForm();
                    setCsvData(null);
                    if (response.errors && response.errors.length > 0) {
                        // Handle case when some records were successful, and some failed
                        if (response.importedCount > 0){
                        toast.success(`${response.importedCount} Tags Successfully Imported`);
                        dispatch(setaddItems(response.result));
                        }
                        // response.errors.forEach((error: any) => {
                        //     toast.error(error);
                        // });
                        setErrors(response.errors);
                    } else if (response.importedCount > 0) {
                        // Handle case when all records were successful
                        toast.success(`${response.importedCount} Tags Successfully Imported`);
                    }
                }
                
            } catch (error: any) {
                toast.error(error?.response?.data?.message);
            }
        },
    });
    console.log(Errors);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
        formik.setFieldValue("file", file);

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    setCsvData(result.data as string[][]);
                },
                header: false, // Set to true if CSV has headers
            });
        } else {
            setCsvData(null);
        }
    };


    return (
        <>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-sm bg-white rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label htmlFor="file" className="block text-gray-700 font-semibold mb-2">
                        Upload CSV File
                    </label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className={`w-full px-4 py-2 border ${formik.errors.file && formik.touched.file ? 'border-red-500' : 'border-gray-300'
                            } rounded-md text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {formik.errors.file && formik.touched.file && (
                        <p className="text-red-500 text-sm mt-2">{formik.errors.file}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={!csvData}
                >
                    Submit
                </button>
            </form>

            {/* Preview CSV Data */}
            {csvData && (
                <div className="w-full max-w-3xl overflow-auto bg-white shadow-lg rounded-lg p-6 overflow-y-auto max-h-[500px]">
                    <h2 className="text-lg font-semibold mb-4">CSV Preview</h2>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                {csvData[0].map((value, index) => (
                                    <th key={index} className="border px-4 py-2 text-gray-600 font-semibold bg-gray-100">
                                        {value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border px-4 py-2 text-gray-700">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {Errors.length > 0 && (
                <div className="w-full overflow-auto bg-white shadow-lg rounded-lg p-6 overflow-y-auto max-h-[500px]">
                    <h2 className="text-lg font-semibold mb-4">Errors</h2>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 text-gray-600 font-semibold bg-gray-100">
                                    Error
                                    </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {Errors.map((error: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2 text-red-600">
                                                    {error}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
        </>
    )
}

export default UploadForm