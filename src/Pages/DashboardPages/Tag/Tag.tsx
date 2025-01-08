import React from "react";
import Layout from "../../../component/Layout/Layout";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import {
  createtagapicall,
  fetchtagapicall,
  removetagapicall,
  updatetagapicall,
  uploadcsvapicall
} from "../../../Services/Admin/Tagapiservice/tagapiservece";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import {
  setaddItems,
  setTagitems,
  setdeleteTagitems,
  setupdateTagitems,
} from "../../../Redux/TagSlice/Tagslice";
import { TfiDownload } from "react-icons/tfi";
import UploadForm from "../../../component/Admin/TagComponent/UploadForm";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteDialog from "../../../Common/DeleteDialog/DeleteDialog";
import * as Yup from "yup";
interface tagTypes {
  Tag_Name: string | any;
}

function Tag() {
  const Roletype: any = useAppSelector((state) => state.user.Role);
  const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);
  const [ismodelOpen, setIsModelOpen] = React.useState<Boolean | null>(false);
  const [editTagId, setEditTagId] = React.useState<number | null>(null); // Store the ID of the tag being edited
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false); // State for delete dialog
  const [isId, setId] = React.useState<number | null>(null); // State for the ID to be deleted
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false); // Track edit mode state
  const dispatch = useAppDispatch();
  const tagvalue = useAppSelector((state) => state.tag.value);

  const formik = useFormik<tagTypes>({
    initialValues: {
      Tag_Name: "",
    },
    validationSchema: Yup.object({
      Tag_Name: Yup.string().required("Tag Name is required"),
      
    }),
    onSubmit: async (value: any) => {
      try {
        if (isEditMode && editTagId !== null) {
          // If in edit mode, call the update API
          const response: unknown | any = await updatetagapicall(
            editTagId,
            value
          );
          if (response.success) {
            toast.success(response.message)
            dispatch(setupdateTagitems(response.result)); // Update the Redux state
            setIsOpen(false);
          }
        } else {
          // If not in edit mode, create a new tag
          const response: unknown | any = await createtagapicall(value);
          if (response.success) {
            toast.success(response.message)
            dispatch(setaddItems(response.result)); // Add the new tag to Redux state
            setIsOpen(false);
          }
        }
        formik.resetForm();
      } catch (error: any) {
          console.log(error?.message);
        toast.error(error.response.data.message)
        setIsOpen(false);
        formik.resetForm();
      }
    },
  });

  // Fetch tags from the API
  const fetchtag = async () => {
    try {
      const response: any = await fetchtagapicall();
      if (response.success) {
        dispatch(setTagitems(response.result));
      }
    } catch (error: any) {
      console.log("fetch tag error", error?.message);
    }
  };

  React.useEffect(() => {
    fetchtag();
  }, [0]);

  // Handle CSV template download
  const csvtemplate = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/tag/download-tag-template",
        {
          method: "GET",
          headers: {
            "Content-Type": "text/csv",
          },
        }
      );
      
      if (!response.ok) {
        toast.error("Something went wrong")
        throw new Error("Network response was not ok");
      }
      toast.success("CSV template downloaded successfully");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Tag-template.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Error downloading the template:", error);
    }
  };

  // Handle edit action
  const handleEdit = (id: number) => {
    const tagToEdit = tagvalue.find((item: any) => item.id === id);
    if (tagToEdit) {
      formik.setValues({ Tag_Name: tagToEdit.Tag_Name }); // Set form values to the selected tag data
      setEditTagId(id); // Store the tag ID being edited
      setIsEditMode(true); // Enable edit mode
      setIsOpen(true); // Open the modal
    }
  };

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      const response: any = await removetagapicall(id);
      if (response.success) {
        setDialogOpen(false);
        toast.success(response.message)
        dispatch(setdeleteTagitems(id)); // Remove the deleted tag from Redux state
        
      }
    } catch (error: any) {
      toast.error("Something went wrong")
    }
  };

  // Render the tags table rows
  const tagsTable = tagvalue.map((item, index) => {
    const { id, Tag_Name,Created_By } = item;

    return (
      <tr className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`} key={id}>
        <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
        <td className="px-6 py-4 text-sm text-gray-700">{Tag_Name}</td>
        <td className="px-6 py-4 text-sm text-gray-700">
        {(Roletype.Type === "superadmin" || 
  (Roletype.Type === "client" && Created_By === Roletype.id)) && (
  <>
    <div className="flex gap-2">
      <MdOutlineEdit
        className="text-blue-500 cursor-pointer text-2xl"
        onClick={() => handleEdit(id)}
      />
      <MdDelete
        className="text-red-500 cursor-pointer text-2xl"
        onClick={() => { setId(id); setDialogOpen(true); }}
      />
      <DeleteDialog
  isOpen={isDialogOpen}
  onClose={() => setDialogOpen(false)}
  onDelete={() => isId !== null && handleDelete(isId)}
/>
    </div>
  </>
)}

        </td>
      </tr>
    );
  });

  return (
    <Layout>
      <Breadcrumb pageName="Tag" />

      <section className="p-4 bg-gray-300 w-full flex gap-4 flex-row relative block overflow-x-hidden mb-3">
        <button
          className="bg-white px-4 py-2 rounded-md"
          onClick={() => {
            setIsOpen(true);
            setIsEditMode(false); // Reset to "add mode"
            formik.resetForm(); // Clear the form
          }}
        >
          Add Tag
        </button>
        <button
          onClick={csvtemplate}
          className="bg-white flex rounded-md justify-center items-center border rounded-md text-black-100 font-lighter text-md px-4 py-2"
        >
          <i className="mx-3">
            <TfiDownload />
          </i>
          Csv Format
        </button>
        <button
          className="bg-white px-4 py-2 rounded-md text-1xl capitalize"
          onClick={() => setIsModelOpen(true)}
        >
          Upload CSV
        </button>
      </section>

      {/* Add/Edit Tag Modal */}
      {isOpen && (
        <Modal setOpen={setIsOpen}>
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 text-gray-700 font-medium text-lg"
                  htmlFor="Tag_Name"
                >
                  Tag
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("Tag_Name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="Tag_Name"
                  id="Tag_Name"
                />
                {
                  formik.errors.Tag_Name && formik.touched.Tag_Name && (
                    <p className="text-red-500 text-sm mt-2">
                      {typeof formik.errors.Tag_Name === 'string' && formik.errors.Tag_Name}
                    </p>
                  )
                }
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white text-sm font-semibold uppercase py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {isEditMode ? "Update Tag" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Upload CSV Modal */}
      {ismodelOpen && (
        <Modal setOpen={setIsModelOpen}>
          <UploadForm />
        </Modal>
      )}

      {/* Tags Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Tag Name
              </th>
              
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tagsTable}</tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Tag;
