import React, { useState } from "react";
import Layout from "../../../component/Layout/Layout";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import {
  setreasonitems,
  setaddreasonitems,
  setdeletereasonitems,
  setupdatereasonitems,
} from "../../../Redux/ReasonSlice/reasonSlice";
import {
  fetchreasionapicall,
  createreasionapicall,
  updatereasionapicall,
  removereasionapicall,
} from "../../../Services/Admin/ReasonApiService/index";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Reason: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  const [editReasonId, setEditReasonId] = useState<number | null>(null); // state for edit mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // flag for edit mode
  const [expandedReasonId, setExpandedReasonId] = useState<number | null>(null); // state for accordion

  const reasonfetch = useAppSelector((state) => state.reason.value);
  const dispatch = useAppDispatch();

  const getReason = async () => {
    const response: any = await fetchreasionapicall();
    if (response.success) {
      dispatch(setreasonitems(response.result));
    }
  };

  React.useEffect(() => {
    getReason();
  }, []);

  const handleEdit = (id: number) => {
    console.log("edit", id);  
    const reasonToEdit = reasonfetch.find((item: any) => item.id === id);
    if (reasonToEdit) {
      formik.setValues({ reason: reasonToEdit.reason }); // Pre-fill form with the reason data
      setEditReasonId(id); // Set the reason ID to edit
      setIsEditMode(true); // Set edit mode to true
      setIsOpen(true); // Open the modal
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await removereasionapicall(id);
    if (response.success) {
      dispatch(setdeletereasonitems(id));
      toast.success("Reason deleted successfully");
    }
  };

  const [answers, setAnswers] = useState<string[]>([""]);

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    onSubmit: async (values) => {
      try {
        if(isEditMode){
          const value = {
            reason: values.reason,
            option: answers,
          };
          const response = await updatereasionapicall(value, editReasonId);
          if (response.success) {
            dispatch(setupdatereasonitems(response.result));
            setIsOpen(false);
            toast.success("Reason updated successfully");
          }
          return;
        }
        else{
        const value = {
          reason: values.reason,
          option: answers,
        };
        const response = await createreasionapicall(value);
        if (response.success) {
          dispatch(setaddreasonitems(response.result));
          setIsOpen(false);
          toast.success("Reason added successfully");
        }}
      } catch (e) {
        console.log(e);
      }
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

  // Toggle accordion for answers
  const toggleAccordion = (id: number) => {
    if (expandedReasonId === id) {
      setExpandedReasonId(null); // Close if clicked again
    } else {
      setExpandedReasonId(id); // Open the clicked one
    }
  };

  return (
    <>
      <Layout>
        <Breadcrumb pageName="Reason" />
        <section className="p-2 bg-gray-300 w-full relative block overflow-x-hidden mb-3">
          <button
            className="m-3 px-4 py-2 bg-white rounded-sm text-md"
            onClick={() => {
              setIsOpen(true);
              setIsEditMode(false);
              formik.resetForm();
            }}
          >
            Add Reason
          </button>
        </section>

        {isOpen && (
          <Modal setOpen={setIsOpen}>
            <div className="form bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-title mb-4 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {isEditMode ? "Edit Reason" : "Add Reason"}
                  </h3>
                </div>

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
{!isEditMode && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
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
)}
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
                  Reason Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reasonfetch &&
                reasonfetch.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <div className="flex items-center">
                        <span
                          className="cursor-pointer text-blue-500"
                          onClick={() => toggleAccordion(item.id)}
                        >
                          {item.reason}
                        </span>
                      </div>
                      {expandedReasonId === item.id && (
                        <div className="pl-4 mt-2">
                          <div className="bg-gray-50 p-2 rounded-md">
                            {item.ReasonAnswers.map((answer: any, idx: number) => (
                              
                              <p key={idx} className="text-sm text-gray-700">
                              <span><strong>{idx+1}</strong></span>  {answer.Reason_answer}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <MdOutlineEdit
                          className="text-blue-500 cursor-pointer text-2xl"
                          onClick={() => handleEdit(item.id)}
                        />
                        <MdDelete
                          className="text-red-500 cursor-pointer text-2xl"
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Reason;
