import React, { useState } from "react";
import { useFormik } from "formik";
import { createReasonapicall } from "../../Services/Admin/ReasonLeavingApiService";

interface FormProps {
    isEditMode?: boolean;
}

const Home: React.FC<FormProps> = ({ isEditMode = false }) => {
    const [answers, setAnswers] = useState<string[]>([""]);

    const formik = useFormik({
        initialValues: {
            reason: "",
        },
        onSubmit: async (values) => {
            const value = {
                reason: values.reason,
                option: answers,
            };
            console.log(value, "values")

            const response = await createReasonapicall(value);
            console.log(response)
        },
    });

    // Handle adding a new answer field
    const addAnswerField = () => {
        setAnswers([...answers, ""]);
    };

    // Handle removing an answer field
    const removeAnswerField = (index: number) => {
        setAnswers(answers.filter((_, i) => i !== index));
    };

    // Handle answer field changes
    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    return (
        <div className="form bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
            <form onSubmit={formik.handleSubmit}>
                {/* Form Title */}
                <div className="form-title mb-4 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800">
                        {isEditMode ? "Edit Reason" : "Add Reason"}
                    </h3>
                </div>

                {/* Reason Field */}
                <div className="mb-4">
                    <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Reason Name
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("reason")}
                        name="reason"
                        id="reason"
                        placeholder="Enter reason"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                    />
                </div>

                {/* Answers Fields */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Answers
                    </label>
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                placeholder={`Answer ${index + 1}`}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                            />
                            {answers.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeAnswerField(index)}
                                    className="ml-2 bg-red-500 text-white font-medium px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAnswerField}
                        className="mt-2 bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Add Answer
                    </button>
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
    );
};

export default Home;
