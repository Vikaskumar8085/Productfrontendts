import React from "react";
import Layout from "../../../component/Layout/Layout";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import {
  createregionapicall,
  fetchregionapicall,
  removeregionapicall,
  editregionapicall,
} from "../../../Services/Admin/Regionapiservice/regionapiserver";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import {
  setaddRegionitems,
  setRegionitems,
  setdeleteRegionitems,
  setupdateRegionitems,
} from "../../../Redux/Region/Regionslice";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface RegionType {
  Name: string;
}

const Region = () => {
  const [isOpen, setIsOpen] = React.useState<boolean | null>(false);
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false); // Flag for edit mode
  const [editRegionId, setEditRegionId] = React.useState<number | null>(null); // Store the region ID being edited

  const regionfetch = useAppSelector((state) => state.region.value);
  const dispatch = useAppDispatch();

  const formik = useFormik<RegionType>({
    initialValues: {
      Name: "",
    },
    onSubmit: async (value) => {
      try {
        if (isEditMode && editRegionId !== null) {
          // If in edit mode, call the update API
          const response: any = await editregionapicall(editRegionId, value);
          if (response.success) {
            dispatch(setupdateRegionitems(response.result));
            setIsOpen(false);
          }
        } else {
          // If not in edit mode, call the create API
          const response: any = await createregionapicall(value);
          if (response.success) {
            dispatch(setaddRegionitems(response.result));
            setIsOpen(false);
          }
        }
        formik.resetForm();
        getRegion(); // Refresh the region list
      } catch (error: any) {
        console.log(error?.message);
      }
    },
  });

  // Fetch regions from the API
  const getRegion = async () => {
    try {
      const response: unknown | any = await fetchregionapicall();
      if (response.success) {
        dispatch(setRegionitems(response.result));
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    getRegion();
  }, []);

  const handleEdit = (id: number) => {
    const regionToEdit = regionfetch.find((item: any) => item.id === id);
    if (regionToEdit) {
      formik.setValues({ Name: regionToEdit.Name }); // Set the form values to the region's data
      setEditRegionId(id); // Set the region ID being edited
      setIsEditMode(true); // Enable edit mode
      setIsOpen(true); // Open the modal
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await removeregionapicall(id);
    if (response.success) {
      dispatch(setdeleteRegionitems(id)); // Update the Redux state
    }
  };

  return (
    <Layout>
      <Breadcrumb pageName="Region" />

      <section className="p-4 bg-gray-300 w-full relative block overflow-x-hidden mb-3">
        <button
          className="bg-white px-4 py-2 rounded-md"
          onClick={() => {
            setIsOpen(true);
            setIsEditMode(false); // Reset to "add mode"
            formik.resetForm(); // Clear the form
          }}
        >
          Add Region
        </button>
      </section>

      {isOpen && (
        <Modal setOpen={setIsOpen}>
          <div className="form bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-title mb-4 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {isEditMode ? "Edit Region" : "Add Region"}
                </h3>
              </div>

              {/* Name Field */}
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="Name"
                  className="mb-2 text-gray-700 font-medium text-base"
                >
                  Name
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("Name")}
                  name="Name"
                  id="Name"
                  placeholder="Enter region name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                />
              </div>

              {/* Submit Button */}
              <div className="flex">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white text-sm font-medium uppercase py-2 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {isEditMode ? "Update Region" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {regionfetch.length > 0 &&
              regionfetch.map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
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
  );
};

export default Region;
