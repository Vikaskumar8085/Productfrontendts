import React from 'react'
import Layout from '../../../component/Layout/Layout'
import { useFormik } from 'formik';
import Modal from '../../../Common/Modal/Modal';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Reduxhook/hooks';
import {
  createEducationapicall,
  fetcheducationapicall,
  updateEducationapicall,
  removeEducationapicall
} from "../../../Services/Admin/educationapiservices/Educationapiservice";
import {
    seteducationitems,setaddeducationitems,setupdateeducationitems,setdeleteeducationitems
} from "../../../Redux/EducationSlice/Educationslice";
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import DeleteDialog from '../../../Common/DeleteDialog/DeleteDialog';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
interface educationType {
    ugCourse: string,
    pgCourse: string | any,
    postPgCourse: string | any,
    candidateId: number
}
const Education = () => {
    const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);  
    const dispatch = useAppDispatch();
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [isId, setId] = React.useState<number | null>(null);
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const educationfetch = useAppSelector(state => state.education.values);
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        level: Yup.string().oneOf(['UG', 'PG', 'POST-PG'], 'Invalid level').required('Level is required'),
        duration: Yup.number().typeError('Duration must be a number').required('Duration is required'),
      });
      const handleEdit = (item: any) => {
        formik.setValues({
          name: item.name,
          level: item.level,
          duration: item.duration,
        });
        setId(item.id);
        setIsEdit(true); // Set isEdit to true
        setIsOpen(true);
      };
        const handleDelete = async (id: number) => {
            try {
            const response: any = await removeEducationapicall(id);
            if (response.success) {
                dispatch(setdeleteeducationitems(id));
                toast.success(response.message);
                setDialogOpen(false);
            }
            } catch (error: any) {
            console.log(error?.message)
            }
        }
        const formik = useFormik({
            initialValues: {
              name: "",
              level: "",
              duration: "",
            },
            validationSchema,
            onSubmit: async (values) => {
              try {
                if (isEdit && isId !== null) {
                  const response: any = await updateEducationapicall(values, isId);
                  if (response.success) {
                    dispatch(setupdateeducationitems(response.result));
                    toast.success(response.message);
                    setIsOpen(false);
                    setIsEdit(false); // Reset isEdit to false
                  }
                } else {
                  const response: any = await createEducationapicall(values);
                  if (response.success) {
                    dispatch(setaddeducationitems(response.result));
                    toast.success(response.message);
                    setIsOpen(false);
                  }
                }
                formik.resetForm();
                setIsOpen(false);
              } catch (error: any) {
                console.log(error?.message);
                toast.error(error.response.data.message);
              }
            }
          });
    const getEducation = async () => {
        try {
            const response: any = await fetcheducationapicall();
            dispatch(seteducationitems(response.result))
        } catch (error: any) {
            console.log(error?.message)
        }
    }
    React.useEffect(() => {
        getEducation()
    }, [0])
    const educationData = (educationfetch || []).map(
        (item: any, index: number) => {
          return (
            <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.level}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.duration}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="flex gap-2">
                  <MdOutlineEdit
                    className="text-blue-500 cursor-pointer text-2xl"
                    onClick={() => handleEdit(item)}
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
          );
        }
      );

    return (
        <Layout>

            <Breadcrumb pageName='Education' />

            <section className='p-4 bg-gray-300 w-full relative block overflow-x-hidden mb-3'>
            <button
  onClick={() => {
    formik.resetForm();
    setIsEdit(false);
    setIsOpen(true);
  }}
  className="m-3 px-4 py-2 bg-white rounded-sm text-md"
>
  Add Education
</button>
            </section>

            {isOpen && (
  <Modal setOpen={setIsOpen}>
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="form-title mb-4">
        <h3 className="text-2xl font-semibold text-gray-700 capitalize text-center py-2 border-b-2 border-gray-200">
          {isEdit ? "Edit Education" : "Add Education"}
        </h3>
      </div>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="form-input">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            {...formik.getFieldProps("name")}
            name="name"
            id="name"
            placeholder="Enter name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Level */}
        <div className="form-input">
          <label htmlFor="level" className="block text-sm font-medium text-gray-600 mb-1">
            Level
          </label>
          <select
            {...formik.getFieldProps("level")}
            name="level"
            id="level"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
          >
            <option value="" label="Select level" />
            <option value="UG" label="UG" />
            <option value="PG" label="PG" />
            <option value="POST-PG" label="POST-PG" />
          </select>
          {formik.touched.level && formik.errors.level && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.level}</p>
          )}
        </div>

        {/* Duration */}
        <div className="form-input">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-600 mb-1">
            Duration
          </label>
          <input
            type="text"
            {...formik.getFieldProps("duration")}
            name="duration"
            id="duration"
            placeholder="Enter duration"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
          />
          {formik.touched.duration && formik.errors.duration && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.duration}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-btn">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </Modal>
)}

            {/* tables */}


            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                SR.NO.
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Level
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
{educationData}
                    </tbody>
                </table>
            </div>

            {/* tables */}


        </Layout>
    )
}

export default Education
