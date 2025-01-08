import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createReasonleavingjobapicall,
  fetchReasonleavingapicall,
} from "../../Services/Admin/ReasonLeavingApiService";
import { useFormik } from "formik";
import toast from "react-hot-toast";

interface ReasonAnswer {
  id: number;
  Reason_answer: string;
}

interface ReasonLeavingData {
  id: number;
  reason: string;
  ReasonAnswers: ReasonAnswer[];
}

interface FormValues {
  reason1?: string;
  reason2?: string;
  reason3?: string;
}

const ReasonLeavingJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isData, setIsData] = React.useState<ReasonLeavingData[]>([]);

  const fetchReasonleavingjob = async () => {
    try {
      const response = await fetchReasonleavingapicall();
      if (response.success) {
        setIsData(response.result);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {},
    onSubmit: async (values: FormValues) => {
      console.log(values, "values");
      const data = {
        candidateId: id,
        questionId: Object.keys(values).map((key) => isData[0]?.id), // Ensuring questionId is same for each field if needed
        answer: Object.values(values),
      };
      console.log(data, "data");
      try {
        const response = await createReasonleavingjobapicall(data);
        if (response.success) {
          toast.success("Reason for leaving job submitted successfully");
          
          
        }
      } catch (error: any) {
        console.log(error?.response.data.message);
        toast.error(error?.response.data.message);
      }
    },
    validate: (values: FormValues) => {
      const errors: FormValues = {};
      if (!values.reason1) {
        errors.reason1 = "Please select a reason";
      }
      return errors;
    },
  });

  useEffect(() => {
    fetchReasonleavingjob();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Reason 1 (Mandatory) */}
        <div className="space-y-4">
          <label
            htmlFor="reason1"
            className="block text-lg font-medium text-gray-700"
          >
            {isData[0]?.reason || "Primary Reason for Leaving (Mandatory)"}
          </label>
          <select
            id="reason1"
            name="reason1"
            onChange={(e) => formik.setFieldValue("reason1", e.target.value)}
            value={formik.values.reason1}
            className={`block w-full px-4 py-2 border rounded-md text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              formik.errors.reason1 && formik.touched.reason1
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select a reason</option>
            {isData?.[0]?.ReasonAnswers?.map((reason) => (
              <option key={reason.id} value={reason.id.toString()}>
                {reason.Reason_answer}
              </option>
            ))}
          </select>
          {formik.errors.reason1 && formik.touched.reason1 && (
            <p className="text-red-500 text-sm">{formik.errors.reason1}</p>
          )}
        </div>

        {/* Reason 2 (Optional) */}
        <div className="space-y-4">
          <select
            id="reason2"
            name="reason2"
            onChange={(e) => formik.setFieldValue("reason2", e.target.value)}
            value={formik.values.reason2}
            className="block w-full px-4 py-2 border rounded-md text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select a reason</option>
            {isData?.[0]?.ReasonAnswers?.map((reason) => (
              <option key={reason.id} value={reason.id.toString()}>
                {reason.Reason_answer}
              </option>
            ))}
          </select>
        </div>

        {/* Reason 3 (Optional) */}
        <div className="space-y-4">
          <select
            id="reason3"
            name="reason3"
            onChange={(e) => formik.setFieldValue("reason3", e.target.value)}
            value={formik.values.reason3}
            className="block w-full px-4 py-2 border rounded-md text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select a reason</option>
            {isData?.[0]?.ReasonAnswers?.map((reason) => (
              <option key={reason.id} value={reason.id.toString()}>
                {reason.Reason_answer}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReasonLeavingJob;
