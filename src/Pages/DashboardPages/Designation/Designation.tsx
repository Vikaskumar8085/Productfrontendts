import React from "react";
import Layout from "../../../component/Layout/Layout";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const [isId, setId] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik<DesigantionType>({
    initialValues: {
      title: "",
    },
    //add validation
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      
    }),
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
        toast.error(error.response.data.message)
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
      toast.error("Some Candidates are associated with this designation")
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
      <section className="p-2 bg-gray-300 w-full relative block overflow-x-hidden mb-3">
        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false); // Reset to add mode when opening modal
          }}
          className="m-3 px-4 py-2 bg-white rounded-sm text-md"
        >
          Add Designation
        </button>
        </section>

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
                {formik.errors.title && formik.touched.title && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.title}
                  </p>
                )}
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

      <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                SR. No.
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
  <tr key={item.id} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
    <td className="px-6 py-4 text-sm text-gray-700">{item.title}</td>
    <td className="px-6 py-4 text-sm text-gray-700">
      <div className="flex gap-2">
        <MdOutlineEdit
          className="text-blue-500 cursor-pointer text-2xl"
          onClick={() => handleEdit(item.id)}
        />
        <div className="flex items-center justify-center bg-gray-100">
          <MdDelete
            className="text-red-500 cursor-pointer text-2xl"
            onClick={() => { setId(item.id); setDialogOpen(true); }}
          />
           <DeleteDialog
  isOpen={isDialogOpen}
  onClose={() => setDialogOpen(false)}
  onDelete={() => isId !== null && handleDelete(isId)}
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
