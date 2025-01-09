import React, { useState, useEffect } from "react";
import Layout from "../../../component/Layout/Layout";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import { fetchtagapicall } from "../../../Services/Admin/Tagapiservice/tagapiservece";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteDialog from "../../../Common/DeleteDialog/DeleteDialog";
import Select from "react-select";
import {
  createclietapicall,
  fetchclientapicall,
  editclientapicall,
  deleteclientapicall,
} from "../../../Services/Admin/Clientapiservice";
import {
  setclient,
  setaddclient,
  setupdateclient,
  setdeleteclient,
} from "../../../Redux/ClientSlice/Clientslice";
import toast from "react-hot-toast";
import * as Yup from "yup";
interface clienttypes {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  PostCode: string;
  GstNumber: string | number;
  Status: string | boolean;
  tags: any[];
}


const Client: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editClientId, setEditClientId] = useState<number | null>(null); // To store the ID of the client being edited
  const clientvalues = useAppSelector((state) => state.client.values);
  const [tags, setTags] = useState<[]>([]);
  const [isId, setId] = React.useState<any | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();

  // Fetch clients on mount
  useEffect(() => {
    fetchclients();
    fetchtags();
  }, [0]);

  const fetchclients = async () => {
    try {
      const response: any = await fetchclientapicall();
      if (response.success) {
        dispatch(setclient(response.result));
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const formik = useFormik<clienttypes>({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Address: "",
      PostCode: "",
      GstNumber: "",
      Status: "Active",
      tags: [] as any[],
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("First Name is required"),
      LastName: Yup.string().required("Last Name is required"),
      Email: Yup.string().email("Invalid email").required("Email is required"),
      Phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be a 10-digit number.")
      .required("Phone number is required."),
      Address: Yup.string().required("Address is required"),
      PostCode: Yup.string(),
      GstNumber: Yup.string().min(15, "GST number must be 15 characters").max(15, "GST number must be 15 characters").required("GST number is required"),
      Status: Yup.string().required("Status is required")
      
    }),
    onSubmit: async (values) => {
      try {
        let response: any;
        if (editClientId) {
          // If editClientId exists, make an edit API call
          response = await editclientapicall(editClientId, values);
          if (response.success) {
            toast.success(response.message)
            dispatch(setupdateclient(response.result));
          }
        } else {
          // Otherwise, create a new client
          response = await createclietapicall(values);
          if (response.success) {
            toast.success(response.message)
            dispatch(setaddclient(response.result));
          }
        }
        setIsOpen(false); // Close the modal after the action
        formik.resetForm();
        setEditClientId(null); // Reset edit client ID
      } catch (error: any) {
        toast.error(error.response.data.message)
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleEdit = (clientId: number) => {
    const clientToEdit = clientvalues.find((client) => client.id === clientId);
    if (clientToEdit) {
      setEditClientId(clientId);
      console.log(clientToEdit)
      formik.setValues(
        {
          FirstName: clientToEdit.FirstName,
          LastName: clientToEdit.LastName,
          Email: clientToEdit.Email,
          Phone: clientToEdit.Phone,
          Address: clientToEdit.Address,
          PostCode: clientToEdit.PostCode,
          GstNumber: clientToEdit.GstNumber,
          Status: clientToEdit.Status,
          tags: clientToEdit.tags.map((tag: { id: any; }) => tag.id),
        },
        true
      );
      setIsOpen(true); // Open the modal to edit the client
    }
  };

  const handleDelete = async (clientId: number) => {
    try {
      const response: any = await deleteclientapicall(clientId);
      if (response.success) {
        setDialogOpen(false);
        toast.success(response.message)
        dispatch(setdeleteclient(clientId));
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.error("Error deleting client:", error);
    }
  };

  const ClientTable = clientvalues.map((item, index) => {
    const {
      id,
       FirstName,
   LastName,
     Email,
    Phone,
      GstNumber,
      Address,
      PostCode,
      Status,
      tags,
    } = item;
    return (
      <tr key={id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{FirstName}</td>
        <td className="px-4 py-2">{LastName}</td>
        <td className="px-4 py-2">{Email}</td>
        <td className="px-4 py-2">{Phone}</td>
        <td className="px-4 py-2">{Address}</td>
        <td className="px-4 py-2">{PostCode}</td>
        <td className="px-4 py-2">{GstNumber}</td>
        <td className="px-4 py-2 text-green-600">{Status}</td>
        <td className="px-4 py-2">
          {tags.map((tag: any, idx: number) => (
            <div key={idx}>{tag.Tag_Name}</div>
          ))}
        </td>
        <td className="px-4 py-2">
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleEdit(id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button> */}
          <div className="flex gap-2">
            <MdOutlineEdit
              className="text-blue-500 cursor-pointer text-2xl"
              onClick={() => handleEdit(id)}
            />
            <div className="flex items-center justify-center bg-gray-100">
              <MdDelete
                className="text-red-500 cursor-pointer text-2xl"
                onClick={() => {
                  setId(id);
                  setDialogOpen(true);
                }}
              />
              <DeleteDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onDelete={() => handleDelete(isId)}
              />
            </div>
          </div>
        </td>
      </tr>
    );
  });
  const fetchtags = async () => {
    try {
      const response: any = await fetchtagapicall();
      if (response.success) {
        setTags(response.result);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const resetForm = () => {
    formik.resetForm();
    setEditClientId(null);
  };
  return (
    <Layout>
      <Breadcrumb pageName="Client" />

      <section className="py-2 mb-3 bg-gray-300 w-full">
        <button
          className="m-3 px-4 py-2 bg-white rounded-sm text-md"
          onClick={() => setIsOpen(true)}
        >
          Add Client
        </button>
      </section>

      {isOpen && (
        <Modal setOpen={(open) => {
          setIsOpen(open);
          if (!open) {
            resetForm();
          }
        }}>
          <div className="form">
            <form
              onSubmit={formik.handleSubmit}
              className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-white shadow-md rounded-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name:
                  </label>
                  <input
                    {...formik.getFieldProps("FirstName")}
                    name="FirstName"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="FirstName"
                  />
                  {formik.touched.FirstName && formik.errors.FirstName && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.FirstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name:
                  </label>
                  <input
                    {...formik.getFieldProps("LastName")}
                    name="LastName"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    id="LastName"
                  />
                  {formik.touched.LastName && formik.errors.LastName && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.LastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  {...formik.getFieldProps("Email")}
                  name="Email"
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="Email"
                />
                {formik.touched.Email && formik.errors.Email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="Phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone:
                </label>
                <input
                  {...formik.getFieldProps("Phone")}
                  name="Phone"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="Phone"
                />
                {formik.touched.Phone && formik.errors.Phone && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address:
                </label>
                <input
                  {...formik.getFieldProps("Address")}
                  name="Address"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  id="Address"
                />
                {formik.touched.Address && formik.errors.Address && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.Address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="PostCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Post Code:
                </label>
                <input
                  {...formik.getFieldProps("PostCode")}
                  name="PostCode"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="PostCode"
                />
                {
                  formik.touched.PostCode && formik.errors.PostCode && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.PostCode}</p>
                  )
                }
              </div>

              <div>
                <label
                  htmlFor="GstNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  GST Number:
                </label>
                <input
                  {...formik.getFieldProps("GstNumber")}
                  name="GstNumber"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  id="GstNumber"
                />
                {
                  formik.touched.GstNumber && formik.errors.GstNumber && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.GstNumber}</p>
                  )
                }
              </div>

              <div>
                <label
                  htmlFor="Status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status:
                </label>
                <select
                  {...formik.getFieldProps("Status")}
                  name="Status"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="Status"
                  value={formik.values.Status.toString()}
                >
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>
                {
                  formik.touched.Status && formik.errors.Status && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.Status}</p>
                  )
                }
              </div>
              <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tags
                      </label>

                      <Select
                        isMulti
                        options={tags}
                        getOptionLabel={(option: any) => option.Tag_Name}
                        getOptionValue={(option: any) => option.id.toString()}
                        onChange={(e: any) => {
                          formik.setFieldValue(
                            "tags",
                            e.map((tag: any) => tag.id)
                          );
                        }}
                        value={tags.filter((tag: any) =>
                          formik.values.tags.includes(tag.id)
                        )}
                      />
                     
                    </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white text-left text-sm text-gray-700">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-2 font-medium text-gray-900">SR.NO.</th>
              <th className="px-4 py-2 font-medium text-gray-900">
                First Name
              </th>
              <th className="px-4 py-2 font-medium text-gray-900">Last Name</th>
              <th className="px-4 py-2 font-medium text-gray-900">Email</th>
              <th className="px-4 py-2 font-medium text-gray-900">Phone</th>
              <th className="px-4 py-2 font-medium text-gray-900">Address</th>
              <th className="px-4 py-2 font-medium text-gray-900">Post Code</th>
              <th className="px-4 py-2 font-medium text-gray-900">
                GST Number
              </th>
              <th className="px-4 py-2 font-medium text-gray-900">Status</th>
              <th className="px-4 py-2 font-medium text-gray-900">Tags</th>
              <th className="px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>{ClientTable}</tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Client;
