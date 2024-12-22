import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createReasonleavingjobapicall, fetchReasonleavingapicall } from '../../Services/Admin/ReasonLeavingApiService';
import { useFormik } from 'formik';


const ReasonLeavingJob = () => {
    const { id } = useParams();

    const [isData, setisData] = React.useState<[]>([]);

    const fetchReasonleavingjob = async () => {
        try {
            const response = await fetchReasonleavingapicall();
            if (response.success) {
                setisData(response.result)
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    }


    const formik = useFormik({
        initialValues: {

        },
        onSubmit: async (values: any) => {
            const data = {
                candidateId: id,
                questionId: Object.keys(values).map(Number),
                answer: Object.values(values)
            };
            const response = await createReasonleavingjobapicall(data)
            console.log(response, "data")
        }
    })


    useEffect(() => {
        fetchReasonleavingjob()
    }, [])

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                {
                    isData.map((item: any, index: any) => {


                        return (
                            <>
                                <div>

                                    <label htmlFor={`question-${item.id}`} className="text-lg font-medium">
                                        {item.reason}
                                    </label>
                                    <select
                                        onChange={(e) =>
                                            formik.setFieldValue(item.id.toString(), e.target.value)
                                        }
                                        className="block w-full px-4 py-2 border rounded-md text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        <option value="">Select an option</option>
                                        {item.ReasonAnswers?.map((reason: any) => {
                                            return <option value={reason.id}>
                                                {reason.Reason_answer}
                                            </option>
                                        })

                                        }

                                    </select>
                                </div>
                            </>
                        )
                    })
                }


                <button>submit</button>
            </form>
        </div>
    )
}

export default ReasonLeavingJob
