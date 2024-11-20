import React from "react";
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

const Reason: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean | null>(false);
  const [editReasonId, setEditReasonId] = React.useState<number | null>(null); // state for edit mode
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false); // flag for edit mode

  const reasonfetch = useAppSelector((state) => state.reason.value);
  const dispatch = useAppDispatch();

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    onSubmit: async (value) => {
      try {
        if (isEditMode && editReasonId) {
          // Update reason API call
          const response: any = await updatereasionapicall(value, editReasonId);
          if (response.success) {
            dispatch(setupdatereasonitems(response.result)); // Update state with the edited reason
            setIsOpen(false);
            setIsEditMode(false); // Reset edit mode after successful update
          }
        } else {
          // Create reason API call
          const response: any = await createreasionapicall(value);
          if (response.success) {
            dispatch(setaddreasonitems(response.result));
            setIsOpen(false);
          }
        }
        formik.resetForm();
      } catch (error: any) {
        console.log(error?.message);
        setIsOpen(false);
      }
    },
  });

  const getReason = async () => {
    const response: any = await fetchreasionapicall();
    if (response.success) {
      dispatch(setreasonitems(response.result));
    }
  };

  React.useEffect(() => {
    getReason();
  }, [0]);

  const handleEdit = (id: number) => {
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
                {/* Form Title */}
                <div className="form-title mb-4 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {isEditMode ? "Edit Reason" : "Add Reason"}
                  </h3>
                </div>

                {/* Name Field */}
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
          </Modal>
        )}

        {/* Table for displaying reasons */}
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
                    <td>{item.reason}</td>
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
