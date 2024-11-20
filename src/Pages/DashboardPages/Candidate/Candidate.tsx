

import React, {  useState } from 'react';
import Layout from '../../../component/Layout/Layout';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import Modal from '../../../Common/Modal/Modal';
import { useFormik } from 'formik';
import { candidateTypes } from '../../../Services/Admin/CandidateApiService/candidatetypes';
import {
  addproductapicall,
  fetchcandidatetapicall,
  updatecandidateapicall,
  RemoveCandidateapicall
} from "../../../Services/Admin/CandidateApiService";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
    RegionSelect,
    PhonecodeSelect
} from "react-country-state-city";
import { fetchdesignationapicall } from '../../../Services/Admin/Designation/index';
import { setCandidate, setAddCandidates, setUpdateCandidates, setDeleteCandidates } from '../../../Redux/CandidateSlice/CandidateSlice';
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import toast from 'react-hot-toast';
import { fetchtagapicall } from '../../../Services/Admin/Tagapiservice/tagapiservece';
const Candidate: React.FC = () => {
     const [editMode, setEditMode] = useState<boolean>(false);
     const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    
    const [isOpen, setIsOpen] = useState<boolean | null>(false);
    const [isData, setData] = useState<[]>([]);
    const [tags, setTags] = useState<[]>([]);
    const [designation, setDesignation] = useState<[]>([]);
    const [region, setRegion] = useState<any>("");
    const [phonecode, setPhoneCode] = useState<any>("");
    const [countryid, setCountryid] = useState<any>(0);
    const [stateid, setstateid] = useState<any>(0);
    const [cityid, setCityid] = useState<any>(0);
    console.log(stateid, "stateid")
    const dispatch = useAppDispatch();
    const candidatevalues = useAppSelector((state) => state.candidate.value);

    const formik = useFormik({
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
            currentEmployeer: "",
            postalAddress: "",
            country: "",
            city: "",
            reason1: "",
            reason2: "",
            reason3: "",
            designationId: 0 as number,
            tags: [] as any[],
            education: {
                ugCourse: "",
                pgCourse: "",
                postPgCourse: "",
            }
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                
                values.state = stateid.name
                values.country = countryid.name
                values.city = cityid.name
                //push selected tags in values.tags it's array so push only id
                

                console.log(values, "values >>>>>>>>>>")
                const response = await addproductapicall(values);
                console.log(response, "response call")
                if (response.success) {
                    toast.success(response.message)
                    dispatch(setAddCandidates(response.result))
                    setIsOpen(false)
                    resetForm();

                }
            
            } catch (error: any) {
                toast.error("Something went wrong")
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
                dispatch(setCandidate(response.result))
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    };
    const handleDelete = async (id: number) => {
        try {
            const response = await RemoveCandidateapicall(id);
            if (response.success) {
            toast.success(response.message)
           dispatch(setDeleteCandidates(id))
            }
        } catch (error: any) {
            toast.error("Something went wrong")
            console.log(error)
        }

    }
    const candidateTabledata = candidatevalues.map((item: any, index: any) => {
        
        return (
            <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.    name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.contactNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.whatsappNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.resumeTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.workExp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.currentCTC}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.currentLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.preferredLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.dob}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.designation.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.currentEmployeer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.postalAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.city}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.education.ugCourse}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.education.pgCourse}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.education.postPgCourse}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.reason1}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.reason2}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.reason3}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                  
                {item.tags.map((tag: any, idx: number) => (
                    <div key={idx}>
                        {tag.Tag_Name},
                    </div>
                ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button className='bg-blue-500 text-white px-3 py-1 rounded-md'>Edit</button>
                    <button className='bg-red-500 text-white px-3 py-1 rounded-md'onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
                
            </tr>
        )
    });

    React.useEffect(() => {
        fetchcandidatedata();
    }, [0]);

    const fetchdesignations = async () => {
        try {
            const response = await fetchdesignationapicall();
            if (response.success) {
                setDesignation(response.result)
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    };

    React.useEffect(() => {
        fetchdesignations();
    }, [0]);
    const fetchtags = async () => {
        try {
            const response:any = await fetchtagapicall();
            if (response.success) {
                setTags(response.result)
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    }
    React.useEffect(() => {
        fetchtags();
    }, [0]);

    return (
      <Layout>
        <Breadcrumb pageName="Candidate" />
        <section className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white capitalize border py-1 px-3 "
          >
            add candidate
          </button>
          {/* model */}
          {isOpen && (
            <Modal setOpen={setIsOpen}>
              <div className="form overflow-y-auto max-h-[500px]">
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
                    <div>
                      <CountrySelect
                        onChange={(e: any) => {
                          setCountryid(e);
                        }}
                        placeHolder="Select Country"
                        region={region}
                      />
                    </div>
                    <div>
                      <StateSelect
                        countryid={countryid.id}
                        onChange={(e: any) => {
                          setstateid(e);
                        }}
                        placeHolder="Select State"
                      />
                    </div>
                    <div>
                      <CitySelect
                        countryid={countryid.id}
                        stateid={stateid.id}
                        onChange={(e: any) => {
                          setCityid(e);
                        }}
                        placeHolder="Select City"
                      />
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

                      <select
                        name="designationId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.designationId}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">--select--</option>
                        {designation.map((item: any, index: any) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                      </select>
                      {formik.touched.designationId &&
                        formik.errors.designationId && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.designationId}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Employeer
                      </label>
                      <input
                        type="text"
                        name="currentEmployeer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currentEmployeer}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.currentEmployeer &&
                        formik.errors.currentEmployeer && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.currentEmployeer}
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Postal Address
                      </label>
                      <input
                        type="text"
                        name="postalAddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.postalAddress}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.postalAddress &&
                        formik.errors.postalAddress && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.postalAddress}
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tags
                      </label>
                      <select
                        name="tags"
                        multiple
                        onChange={(e) => {
                          const selectedTags = Array.from(
                            e.target.selectedOptions
                          ).map((option) => Number(option.value));
                          formik.setFieldValue("tags", selectedTags);
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {tags.map((item: any, index: any) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.Tag_Name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        UG Course
                      </label>

                      <input
                        type="text"
                        name="education.ugCourse"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.education.ugCourse}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.education?.ugCourse &&
                        formik.errors.education?.ugCourse && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.education.ugCourse}
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PG Course
                      </label>
                      <input
                        type="text"
                        name="education.pgCourse"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.education.pgCourse}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.education?.pgCourse &&
                        formik.errors.education?.pgCourse && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.education.pgCourse}
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Post PG Course
                      </label>
                      <input
                        type="text"
                        name="education.postPgCourse"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.education.postPgCourse}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
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
                  designation
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  current Employeer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  postal Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  City
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
                  Reason 1
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Reason 2
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Reason 3
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Tags
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
