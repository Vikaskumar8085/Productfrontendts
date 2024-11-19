import React from 'react'
import Layout from '../../../component/Layout/Layout'
import { useFormik } from 'formik';
import Modal from '../../../Common/Modal/Modal';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Reduxhook/hooks';
import {
  createEducationapicall,
  fetcheducationapicall,
} from "../../../Services/Admin/educationapiservices/Educationapiservice";
import {
  seteducationitems,
  setaddeducationitems,
} from "../../../Redux/EducationSlice/Educationslice";

interface educationType {
    ugCourse: string,
    pgCourse: string | any,
    postPgCourse: string | any,
    candidateId: number
}
const Education = () => {
    const [isOpen, setIsOpen] = React.useState<Boolean | null>(false);  
    const dispatch = useAppDispatch();
    const educationfetch = useAppSelector(state => state.education.values);
   
    const formik = useFormik<educationType>({
        initialValues: {
            ugCourse: "",
            pgCourse: "",
            postPgCourse: "",
            candidateId: 5
        },
        onSubmit: async (values) => {
            try {
                const response: any = await createEducationapicall(values);
                if (response.success) {
                    dispatch(setaddeducationitems(response.result))
                    setIsOpen(false)
                }
                formik.resetForm();
                setIsOpen(false)
                
            } catch (error: any) {
                console.log(error?.message)

            }
        }
    })
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
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.ugCourse}</td>
            <td>{item.pgCourse}</td>
            <td>{item.postPgCourse}</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        );
      }
    );

    return (
        <Layout>

            <Breadcrumb pageName='Education' />

            <section className='p-4 bg-gray-300 w-full relative block overflow-x-hidden mb-3'>
                <button onClick={() => setIsOpen(true)} className='px-4 py-2 bg-white    rounded-lg capitalize '>
                    Add Education
                </button>
            </section>

            {isOpen && <Modal setOpen={setIsOpen}>
                <div className="bg-white  rounded-lg p-6 w-full max-w-md mx-auto">
                    <div className="form-title mb-4">
                        <h3 className="text-2xl font-semibold text-gray-700 capitalize text-center py-2 border-b-2 border-gray-200">
                            Add Education
                        </h3>
                    </div>

                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        {/* Undergraduate Course */}
                        <div className="form-input">
                            <label htmlFor="ugCourse" className="block text-sm font-medium text-gray-600 mb-1">
                                Undergraduate Course
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("ugCourse")}
                                name="ugCourse"
                                id="ugCourse"
                                placeholder="Enter your UG course"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Postgraduate Course */}
                        <div className="form-input">
                            <label htmlFor="pgCourse" className="block text-sm font-medium text-gray-600 mb-1">
                                Postgraduate Course
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("pgCourse")}
                                name="pgCourse"
                                id="pgCourse"
                                placeholder="Enter your PG course"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700"
                            />
                        </div>
                    <div className="form-input">
                            <label htmlFor="pgCourse" className="block text-sm font-medium text-gray-600 mb-1">
                               Post PG Course
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("postPgCourse")}
                                name='postPgCourse'
                                id='postPgCourse'
                                placeholder='Enter your Post PG course'
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-700'
                            />
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

            </Modal>}

            {/* tables */}


            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                UG Course
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                PG Course
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Post PG Course
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
