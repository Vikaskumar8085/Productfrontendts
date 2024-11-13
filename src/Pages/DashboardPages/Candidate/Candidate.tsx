import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb'
import useState from 'react';
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import { candidateTypes } from '../../../Services/CandidateApiService/candidatetypes';
import { addproductapicall, fetchcandidatetapicall,RemoveCandidateapicall } from '../../../Services/CandidateApiService';
import useEffect from 'react';
const Candidate: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<boolean | null>(false)
    const [isData, setData] = React.useState<[]>([]);
    const [editCandidate, setEditCandidate] = React.useState<candidateTypes | null>(null);
    const formik = useFormik<candidateTypes>({
        initialValues: {
            name: "",
            resumeTitle: "",
            contactNumber: "",
            whatsappNumber: "",
            email: "",
            workExp: "",
            currentCTC: "",
            currentLocation: "",
            state: "",
            preferredLocation: "",
            dob: "",
            designation: ""
        },
        onSubmit: async (values, { resetForm }) => {

            try {
                console.log(values, "values >>>>>>>>>>")
                const response = await addproductapicall(values);
                console.log(response, "response call")
                if (response.success) {
                    fetchcandidatedata()
                    setIsOpen(false)
                    resetForm();
                }
            } catch (error: any) {
                console.log(error)
                setIsOpen(false)
                resetForm();

            }
        },
    });

    const fetchcandidatedata = async () => {
        try {
            const response = await fetchcandidatetapicall();
            if (response.success) {
                setData(response.result)
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    }
    const handleDelete = async (id: number) => {
        try {
            const response = await RemoveCandidateapicall(id);
            if (response.success) {
                fetchcandidatedata();
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    }
    const handleEdit = (candidate: candidateTypes) => {
        setEditCandidate(candidate);
        formik.setValues(candidate); // Pre-fill the form with candidate data
        setIsOpen(true); // Open the modal
      };
    const candidateTabledata = isData.map((item, index) => {
        const {
            id, 
            name,
            resumeTitle,
            contactNumber,
            whatsappNumber,
            email,
            workExp,
            currentCTC,
            currentLocation,
            state,
            preferredLocation,
            dob,
            designation } = item;

        return (
            <>
                <tr>
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{name} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{email} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contactNumber} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{whatsappNumber} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{resumeTitle} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{workExp} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{currentCTC} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{currentLocation} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{state} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{preferredLocation} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{dob} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{designation} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
         
          <button 
            onClick={() =>handleDelete(id)}
            className="px-4 py-2 bg-red-400 border capitalize"
          >
           Delete
          </button>
        </td>
                </tr>

            </>
        )
    })


    React.useEffect(() => {
        fetchcandidatedata()
    }, [0])

    return (
      <Layout>
        <Breadcrumb pageName="Candidate" />
        <section className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200">
        <button
          onClick={() => {
            setEditCandidate(null); // Clear edit candidate data
            setIsOpen(true); // Open modal to add a new candidate
          }}
          className="bg-white capitalize border py-1 px-3 "
        >
          Add Candidate
        </button>
          {/* model */}
          {isOpen && (
            <Modal setOpen={setIsOpen}>
              <div className="form">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>

                    {/* Resume Title Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Resume Title
                      </label>
                      <input
                        type="text"
                        name="resumeTitle"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.resumeTitle}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.resumeTitle &&
                        formik.errors.resumeTitle && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.resumeTitle}
                          </p>
                        )}
                    </div>

                    {/* Contact Number Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        name="contactNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactNumber}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.contactNumber &&
                        formik.errors.contactNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.contactNumber}
                          </p>
                        )}
                    </div>

                    {/* WhatsApp Number Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.whatsappNumber}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.whatsappNumber &&
                        formik.errors.whatsappNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.whatsappNumber}
                          </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    {/* Work Experience Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Work Experience
                      </label>
                      <input
                        type="text"
                        name="workExp"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.workExp}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.workExp && formik.errors.workExp && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.workExp}
                        </p>
                      )}
                    </div>

                    {/* Current CTC Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current CTC
                      </label>
                      <input
                        type="text"
                        name="currentCTC"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currentCTC}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.currentCTC &&
                        formik.errors.currentCTC && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.currentCTC}
                          </p>
                        )}
                    </div>

                    {/* Current Location Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Location
                      </label>
                      <input
                        type="text"
                        name="currentLocation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currentLocation}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.currentLocation &&
                        formik.errors.currentLocation && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.currentLocation}
                          </p>
                        )}
                    </div>

                    {/* State Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.state && formik.errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.state}
                        </p>
                      )}
                    </div>

                    {/* Preferred Location Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        name="preferredLocation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.preferredLocation}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.preferredLocation &&
                        formik.errors.preferredLocation && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.preferredLocation}
                          </p>
                        )}
                    </div>
                    {/* designation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.designation}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.preferredLocation &&
                        formik.errors.preferredLocation && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.preferredLocation}
                          </p>
                        )}
                    </div>
                    {/* Date of Birth Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob as string}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.dob && formik.errors.dob && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.dob}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Modal>
          )}

          {/* model */}
          {/* <select className='p-1'>
                    <option value="-- select option --">Bulk Action</option>
                    <option value="upload csv" onClick={}>Csv upload</option>

                </select> */}
        </section>
        {/* show table */}
        <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Whatsapp Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  ResumeTitle
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  work Experience
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Current Ctc
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Current Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  state
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Preferred Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  dob
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{candidateTabledata}</tbody>
          </table>
        </div>
      </Layout>
    );
}

export default Candidate
