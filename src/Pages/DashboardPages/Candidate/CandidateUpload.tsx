import React, { useState } from 'react';
import { useFormik, FormikErrors, FormikHelpers } from 'formik';
import { TfiDownload } from "react-icons/tfi";
import Papa from 'papaparse';
import Layout from '../../../component/Layout/Layout';
import { csvbulkuploadapicall, csvtemplateapicall } from '../../../Services/Admin/CandidateApiService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
interface FormValues {
    file: File | null;
}
const Spinner = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
    </div>
  );
const CandidateUpload: React.FC = () => {
    const navigate = useNavigate()
    const [csvData, setCsvData] = useState<string[][] | null>(null);
    const [Errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // formik 
    const formik = useFormik<FormValues>({
        initialValues: {
            file: null,
        },
        validationSchema: Yup.object({
            file: Yup.mixed().required("A CSV file is required"),
            
          }),
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
                setIsLoading(true);
                const formdata: any | null = new FormData();
                formdata.append("file", values.file);
            
                // API call to upload CSV
                const response = await csvbulkuploadapicall(formdata);
            
                // Check if the response indicates partial success
                if (response.success) {
                    if (response.errors && response.errors.length > 0) {
                        // Handle case when some records were successful, and some failed
                        if (response.importedCount > 0){
                        toast.success(`${response.importedCount} Candidate(s) Successfully Imported`);
                        }
                        // response.errors.forEach((error: any) => {
                        //     toast.error(error);
                        // });
                        setErrors(response.errors);
                    } else if (response.importedCount > 0) {
                        // Handle case when all records were successful
                        toast.success(`${response.importedCount} Candidate(s) Successfully Imported`);
                    }
            
                    // // Navigate to candidate page
                    // navigate("/candidate");
            
                } else {
                    // If the response was not successful
                    toast.error("Failed to import candidates. Please check the errors.");
                    if (response.errors) {
                        // Show detailed errors for the failed records
                        response.errors.forEach((error: any) => {
                            toast.error(error);
                        });
                    }
                }
            
                // Reset form and clear preview data after processing
                resetForm();
                setCsvData(null); // Clear preview after submission
            
            } catch (error: any) {
                // Handle any errors during the API call or network issues
                if (error.response?.data?.errors) {
                    // If there are errors in the response, show them
                    for (const key in error.response.data.errors) {
                        toast.error(error.response.data.errors[key]);
                    }
                } else {
                    // If no specific errors, show a generic error message
                    toast.error("Something went wrong");
                    console.log(error?.message);
                }
            } finally {
                setIsLoading(false);
            }
            
        },
    });
    // handleFilechange
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


    // download csv template

    const csvtemplate = async () => {
        try {
            // Fetch the CSV template from your API
            const response = await fetch('http://localhost:8000/api/candidate/download-csv-candidate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/csv',
                },
            });
            toast.success("CSV template downloaded successfully")
            if (!response.ok) {
                toast.error("Something went wrong")
                throw new Error('Network response was not ok');
            }
            // Convert response to blob
            const blob = await response.blob();

            // Create a link and trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'candidate-template.csv'; // Set the desired file name
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (error: any) {
            console.error('Error downloading the template:', error);
        }
    }

    return (
        <Layout>

            <div className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200">
                <button onClick={csvtemplate} className="bg-white flex rounded-md justify-center items-center border rounded-md text-black-100 font-lighter text-md px-4 py-2" >
                    <i className='mx-3'><TfiDownload /></i>
                    Csv Format</button>
            </div>

            <h1 className="text-2xl font-semibold mb-4">Bulk Upload Candidates</h1>
            <section className="flex flex-col flex justify-center h-full gap-6 items-center">
                
                {/* Form */}
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
                       {
                        formik.errors.file && formik.touched.file && (
                            <p className="text-red-500 text-sm mt-2">{formik.errors.file}</p>
                        )
                       }
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={!csvData}
                    >
                        Submit
                    </button>
                </form>
                    {isLoading && <Spinner />}
                {/* Preview CSV Data */}
                {csvData && (
                    <div className="w-full max-w-3xl overflow-auto bg-white shadow-lg rounded-lg p-6 max-h-[80vh] max-w-full">
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
    <div className="w-full max-w-3xl overflow-auto bg-white shadow-lg rounded-lg p-6 max-h-[80vh] max-w-full">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Errors</h2> {/* Title in red */}
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
                        <td className="border px-4 py-2 text-red-600"> {/* Error text in red */}
                            {error}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

            </section>
        </Layout>

    );
};

export default CandidateUpload;
