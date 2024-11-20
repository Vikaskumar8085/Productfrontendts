import React from "react";
import Layout from "../../../component/Layout/Layout";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import {
  addDesignationapicall,
  fetchdesignationapicall,
  removedesignationapicall,
  updatedesignationapicall,
} from "../../../Services/Admin/Designation";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import {
  setAddDesignations,
  setDesignation,
  setDeleteDesignations,
  setUpdateDesignations
} from "../../../Redux/DesignationSlice/DesignationSlice";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteDialog from "../../../Common/DeleteDialog/DeleteDialog";
interface DesigantionType {
  title: string;
}

const Designation: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
     

 
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false); // state for edit mode
  const [editDesignationId, setEditDesignationId] = React.useState<
    number | null
  >(null); // state for editing designation
  const designationfetch = useAppSelector(
    (state: any) => state.designation.value
  );
  const dispatch = useAppDispatch();

  const formik = useFormik<DesigantionType>({
    initialValues: {
      title: "",
    },
    onSubmit: async (value) => {
      try {
        if (isEdit && editDesignationId) {
          const response = await updatedesignationapicall(
            value,
            editDesignationId
          ); // update API call
          if (response.success) {
            toast.success(response.message)
            dispatch(setUpdateDesignations(response.result))
            setOpen(false);
            setIsEdit(false);
          }
        } else {
          const response = await addDesignationapicall(value); // add API call
          if (response.success) {
            toast.success(response.message)
            dispatch(setAddDesignations(response.result));
            setOpen(false);
          }
        }
        formik.resetForm();
      } catch (error: any) {
        toast.error("Something went wrong")
        console.log(error?.message);
        setOpen(false);
      }
    },
  });

  const fetchdesignation = async () => {
    try {
      const response = await fetchdesignationapicall();
      if (response.success) {
        dispatch(setDesignation(response.result));
      }
    } catch (error: any) {
      console.log(error?.message, "error message");
    }
  };

  React.useEffect(() => {
    fetchdesignation();
  }, [0]);

  const handleDelete = async (id: number) => {
    try {
      const response = await removedesignationapicall(id);
      if (response.success) {
        toast.success(response.message)
        dispatch(setDeleteDesignations(id))
        setDialogOpen(false)
      }
    } catch (error: any) {
      toast.error("Something went wrong")
    }
    
  };

  const handleEdit = (id: number) => {
    const designationToEdit = designationfetch.find(
      (item: any) => item.id === id
    );
    if (designationToEdit) {
      formik.setValues({ title: designationToEdit.title });
      setEditDesignationId(id);
      setIsEdit(true);
      setOpen(true);
      console.log(designationToEdit,"designationToEdit")
    }
  };

  return (
    <Layout>
      <Breadcrumb pageName="Designation" />
      <div className="designation_header mb-2">
        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false); // Reset to add mode when opening modal
          }}
          className="px-4 py-2 bg-yellow-400 border capitalize"
        >
          Add Designation
        </button>
      </div>

      {isOpen && (
        <Modal setOpen={setOpen}>
          <div className="w-[300px] md:w-[300px]">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 text-gray-700 font-medium text-lg"
                  htmlFor="designation"
                >
                  {isEdit ? "Edit Designation" : "Add Designation"}
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("title")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="title"
                  id="title"
                />
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white text-sm font-semibold uppercase py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {isEdit ? "Update" : "Submit"}
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {designationfetch?.map((item: any, index: number) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <div className="flex gap-2">
                    <MdOutlineEdit
                      className="text-blue-500 cursor-pointer text-2xl"
                      onClick={() => handleEdit(item.id)}
                    />
                    <div className="flex items-center justify-center bg-gray-100">
                      <MdDelete
                      className="text-red-500 cursor-pointer text-2xl"
                      onClick={() => setDialogOpen(true)}
                      />
                      <DeleteDialog
                        isOpen={isDialogOpen}
                        onClose={() => setDialogOpen(false)}
                        onDelete={() => handleDelete(item.id)}
                      />
                    </div>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Designation;
