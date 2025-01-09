import React, { useState, useEffect } from "react";
import Layout from "../../../component/Layout/Layout";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
import { Link, useLocation } from 'react-router-dom';
import { candidateTypes } from "../../../Services/Admin/CandidateApiService/candidatetypes";
import {
  addproductapicall,
  fetchcandidatetapicall,
  updatecandidateapicall,
  RemoveCandidateapicall,
} from "../../../Services/Admin/CandidateApiService";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";
import { fetchdesignationapicall } from "../../../Services/Admin/Designation/index";
import {
  setCandidate,
  setAddCandidates,
  setUpdateCandidates,
  setDeleteCandidates,
} from "../../../Redux/CandidateSlice/CandidateSlice";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import toast from "react-hot-toast";
import { fetchtagapicall,createtagapicall } from "../../../Services/Admin/Tagapiservice/tagapiservece";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteDialog from "../../../Common/DeleteDialog/DeleteDialog";
import {
  fetchdegreebynamesapicall,
  fetchdegreeapicall,
} from "../../../Services/Admin/DegreeProgram/index";
import Select from "react-select";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import { addDesignationapicall } from "../../../Services/Admin/Designation/index";
import { TfiDownload } from "react-icons/tfi";



const Candidate: React.FC = () => {
  const Roletype: any = useAppSelector((state) => state.user.Role);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ugdegree, setUgdegree] = useState<[]>([]);
  const [pgdegree, setPgdegree] = useState<[]>([]);
  const [postpgdegree, setPostpgdegree] = useState<[]>([]);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  const [tags, setTags] = useState<any[]>([]);
  
  interface DesignationType {
    id: number;
    title: string;
  }
  interface Filters {

    name: string;
  
    email: string;
  
    contactNumber: string;
  
    // Add other fields as necessary
  
  }
  
  const location = useLocation();
  const [filters, setFilters] = useState<{
    name: string;
    email: string;
    contactNumber: string;
    whatsappNumber: string;
    resumeTitle: string;
    workExp: string;
    currentCTC: string;
    currentLocation: string;
    state: string;
    preferredLocation: string;
    dob: string;
    age: string;
    designation: string;
    currentEmployer: string;
    postalAddress: string;
    country: string;
    city: string;
    ugCourse: string;
    pgCourse: string;
    postPgCourse: string;
    reasonAnswer: string;
    tagName: string;
  }>({
    name: '',
    email: '',
    contactNumber: '',
    whatsappNumber: '',
    resumeTitle: '',
    workExp: '',
    currentCTC: '',
    currentLocation: '',
    state: '',
    preferredLocation: '',
    dob: '',
    age: '',
    designation: '',
    currentEmployer: '',
    postalAddress: '',
    country: '',
    city: '',
    ugCourse: '',
    pgCourse: '',
    postPgCourse: '',
    reasonAnswer: '',
    tagName: '',
  });
  
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const [limit, setLimit] = useState<number>(20);
  const [designation, setDesignation] = useState<any[]>([]);
  const [region, setRegion] = useState<any>("");
  const [countryid, setCountryid] = useState<any>(0);
  const [stateid, setstateid] = useState<any>(0);
  const [cityid, setCityid] = useState<any>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {

    const queryParams = new URLSearchParams(location.search);

    const reasonAnswer = queryParams.get('reasonAnswer');
    const UserId = queryParams.get('UserId');
    const tagName = queryParams.get('tagName');
    const state = queryParams.get('state');
    const workExpRange = queryParams.get('workExpRange');
    const designation = queryParams.get('designation');
    if (reasonAnswer) {

      setFilters((prev) => ({ ...prev, reasonAnswer })); // Set reasonAnswer in filters

    }
    if (UserId) {

      setFilters((prev) => ({ ...prev, UserId })); // Set UserId in
    }
    if (tagName) {

      setFilters((prev) => ({ ...prev, tagName })); // Set tagName in filters
    }
    if (state) {

      setFilters((prev) => ({ ...prev, state })); // Set state in filters
    }
    if (workExpRange){
      setFilters((prev) => ({ ...prev, workExpRange })); // Set workExpRange in filters
    }
    if (designation) {

      setFilters((prev) => ({ ...prev, designation })); // Set designation in filters
    }

  }, [location.search]);
  const candidatevalues = useAppSelector((state) => state.candidate.value);
  interface DesignationType {
    id: number;
    title: string;
  }
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
      designationId: 0 as number,
      tags: [] as any[],
      education: {
        ugCourse: "",
        pgCourse: "",
        postPgCourse: "",
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      resumeTitle: Yup.string().required("Resume title is required."),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact number must be a 10-digit number.")
        .required("Contact number is required."),
      whatsappNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Whatsapp number must be a 10-digit number.")
        .required("Whatsapp number is required."),
      email: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
        workExp: Yup.string()
        .matches(/^\d+(\.\d+)? Y$/, "Invalid Work Experience. Please provide in Y format. For example 2 Y or 2.5 Y"),
      currentCTC: Yup.string()
        .matches(/^\d+(\.\d+)? LPA$/, "Invalid Current CTC. Please provide in LPA format. For example 2.5 LPA or 5 LPA"),
      currentLocation: Yup.string(),
      state: Yup.string().nullable(),
      preferredLocation: Yup.string(),
      dob: Yup.date(),
      currentEmployeer: Yup.string(),
      postalAddress: Yup.string(),
      country: Yup.string().nullable(),
      city: Yup.string().nullable(),
      designationId: Yup.number(),
      tags: Yup.array(),
      education: Yup.object({
        ugCourse: Yup.string().nullable(),
        pgCourse: Yup.string().nullable(),
        postPgCourse: Yup.string().nullable(),
      }),
    }),
    //console if error

    onSubmit: async (values, { resetForm }) => {
      try {
        values.state = stateid.name;
        values.country = "India";
        values.city = cityid.name;
        console.log("values", values);
        let response;
        if (editMode && selectedCandidate) {
          response = await updatecandidateapicall(selectedCandidate.id, values);
        } else {
          response = await addproductapicall(values);
        }

        if (response.success) {
          toast.success(response.message);
          if (editMode) {
            dispatch(setUpdateCandidates(response.result));
          } else {
            dispatch(setAddCandidates(response.result));
          }
          setIsOpen(false);
          resetForm();
          setEditMode(false);
          setSelectedCandidate(null);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
        setIsOpen(false);
        resetForm();
      }
    },
  });
  const resetForm = () => {
    formik.resetForm();
    setEditMode(false);
    setSelectedCandidate(null);
    setCountryid(0);
    setstateid(0);
    setCityid(0);
  };
  
  const fetchcandidatedata = async () => {
    try {
      const response = await fetchcandidatetapicall({
        page: currentPage,
        limit: limit,
        ...filters,
      });
      if (response.success) {
        dispatch(setCandidate(response.result));
        setTotalPages(response.totalPages); // Set total pages from response
      }
     
    } catch (error: any) {
      console.log(error?.response.data.message);
      
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await RemoveCandidateapicall(id);
      if (response.success) {
        setDialogOpen(false);
        toast.success(response.message);
        dispatch(setDeleteCandidates(id));
      }
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const fetchDataIfNeeded = async () => {
    if (tags.length === 0) {
      await fetchtags();
    }
    if (designation.length === 0) {
      await fetchdesignations();
    }
    if (ugdegree.length === 0 || pgdegree.length === 0 || postpgdegree.length === 0) {
      await fetchdegree();
    }
  };
  const handleEdit = async (candidate: any) => {
    setSelectedCandidate(candidate);
    setEditMode(true);
    await fetchDataIfNeeded();
    const countries = await GetCountries();
    const countryObj = countries.find((c: any) => c.name === candidate.country);

    if (countryObj) {
      setCountryid(countryObj);

      const states = await GetState(countryObj.id);
      const stateObj = states.find((s: any) => s.name === candidate.state);
      if (stateObj) {
        setstateid(stateObj);

        const cities = await GetCity(countryObj.id, stateObj.id);
        const cityObj = cities.find((c: any) => c.name === candidate.city);
        if (cityObj) {
          setCityid(cityObj);
        }
      }
    }

    formik.setValues({
      name: candidate.name,
      resumeTitle: candidate.resumeTitle,
      contactNumber: candidate.contactNumber,
      whatsappNumber: candidate.whatsappNumber,
      email: candidate.email,
      workExp: candidate.workExp,
      currentCTC: candidate.currentCTC,
      currentLocation: candidate.currentLocation,
      state: candidate.state,
      preferredLocation: candidate.preferredLocation,
      dob: formatDate(candidate.dob, true),
      currentEmployeer: candidate.currentEmployeer,
      postalAddress: candidate.postalAddress,
      country: candidate.country,
      city: candidate.city,
      designationId: candidate.designationId,
      tags: candidate.tags.map((tag: any) => ({
        id: tag.id,
        Tag_Name: tag.Tag_Name
      })),
      education: candidate.education,
    });
    setIsOpen(true);
  };
  const formatDate = (date: string, forInput: boolean = false) => {
    if (!date) return "";

    if (forInput) {
      // Format for input field (YYYY-MM-DD)
      return new Date(date).toISOString().split("T")[0];
    } else {
      // Format for display (MM/DD/YYYY)
      return new Date(date).toLocaleDateString();
    }
  };
  const AgeCount = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const fetchdegree = async () => {
    const response: any = await fetchdegreeapicall();
    if (response.success) {
      //search UG
      const ugdegree = response.result.filter(
        (degree: any) => degree.level === "UG"
      );
      setUgdegree(ugdegree);
      //search PG
      const pgdegree = response.result.filter(
        (degree: any) => degree.level === "PG"
      );
      setPgdegree(pgdegree);
      //search POST PG
      const postpgdegree = response.result.filter(
        (degree: any) => degree.level === "Post-PG"
      );
      setPostpgdegree(postpgdegree);
    }
  };
 
  
  const candidateTabledata = candidatevalues.map((item: any, index: any) => {
    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  
        {(currentPage - 1) * limit + index + 1}
</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.contactNumber}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.whatsappNumber}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.resumeTitle}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.workExp}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.currentCTC}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.currentLocation}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.state}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.preferredLocation}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {formatDate(item.dob)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {AgeCount(item.dob)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.designation.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.currentEmployeer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.postalAddress}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.country}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.city}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {
  //it can be null
  item.education.ugCourse? item.education.ugCourse: ""
  }
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {
  //it can be null
          item.education.pgCourse? item.education.pgCourse: ""
          }
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {
  //it can be null
          item.education.postPgCourse? item.education.postPgCourse: ""
          }
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {item.reasons.map((reason: any, idx: number) => (
          <div key={idx}>
           
            <strong>{reason.ReasonAnswer.Reason_answer}</strong> 
          </div>
        ))}
      </td>
        
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  {item.tags.map((tag: any, idx: number) => (
    <span key={idx} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
      {tag.Tag_Name}
    </span>
  ))}
</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {(Roletype.Type === "superadmin" || 
  (Roletype.Type === "client" && item.UserId === Roletype.id)) && (
  <>
    <div className="flex items-center justify-center gap-2">
      <MdEdit
        className="text-blue-500 cursor-pointer text-3xl"
        onClick={() => handleEdit(item)}
      />
      <MdDelete
        className="text-red-500 cursor-pointer text-3xl"
        onClick={() => {
          setSelectedId(item.id);
          setDialogOpen(true);
        }}
      />
      <DeleteDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onDelete={() => handleDelete(selectedId!)}
      />
    </div>
  </>
)}

        </td>
      </tr>
    );
  });
  
  
  
  useEffect(() => {
    console.log("filters", filters);
    fetchcandidatedata();
  
  }, [filters, currentPage, limit]);
  const fetchdesignations = async () => {
    try {
      const response = await fetchdesignationapicall();
      if (response.success) {
        setDesignation(response.result);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

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
  const handleAddCandidate = () => {
  resetForm();
  fetchDataIfNeeded();
  setIsOpen(true);
};
  return (
    <Layout>
      <Breadcrumb pageName="Candidate" />
      <section className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200 justify-between">
        <div className="flex gap-2">
        <button
          onClick={handleAddCandidate}
          className="bg-white capitalize border py-1 px-3 "
        >
          add candidate
        </button>
        {Roletype.Type === "superadmin" && (<>
        <Link to="/bulk-upload">
        <button
          className="bg-white px-4 py-2 rounded-md text-1xl capitalize"
          
        >
          Upload CSV
        </button>
        </Link>
        </>)}
        </div>
        {/* model */}
        {isOpen && (
          <Modal
            setOpen={(open) => {
              setIsOpen(open);
              if (!open) {
                resetForm();
              }
            }}
          >
            <div className="form overflow-y-auto max-h-[500px]">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h2>
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

                    {/* Designation Field */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Designation
                      </label>
                      <Select
                        options={designation}
                        getOptionLabel={(option: DesignationType) =>
                          option.title
                        }
                        getOptionValue={(option: DesignationType) =>
                          option.id.toString()
                        }
                        onChange={(e: DesignationType | null) => {
                          if (e) {
                            formik.setFieldValue("designationId", e.id);
                          }
                        }}
                        value={designation.find(
                          (d: DesignationType) =>
                            d.id === formik.values.designationId
                        )}
                      />
                    </div> */}
                    <div>
  <label className="block text-sm font-medium text-gray-700">
    Designation
  </label>
  <CreatableSelect
  formatCreateLabel={(inputValue) => `Create ${inputValue}`}
    options={designation}
    getOptionLabel={(option: any) => option.title || option.label}
    getOptionValue={(option: any) => option.id || option.value}
    onChange={(e: DesignationType | null) => {
      if (e) {
        formik.setFieldValue("designationId", e.id);
      }
    }}
    onCreateOption={async (inputValue: string) => {
      try {
        // Call the API to save the new designation
        const newDesignation = await addDesignationapicall({
         
          title: inputValue,
        });

        // Update the state with the new designation returned from the API
        const newOption = {
          id: newDesignation.result.id, // Use ID returned from API
          title: newDesignation.result.title,
        };
        setDesignation([...designation, newOption]);

        // Update Formik value
        formik.setFieldValue("designationId", newOption.id);
      } catch (error: any) {
        console.error("Error creating designation:", error?.response.data.message);
        toast.error(error?.response.data.message);
      }
    }}
    value={designation.find(
      (d: DesignationType) => d.id === formik.values.designationId
    )}
    placeholder="Select designation"
    
  />
</div>

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
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      <label className=" block text-sm font-medium text-gray-700">
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <StateSelect
                        countryid={101}
                        onChange={(e: any) => {
                          setstateid(e);
                        }}
                        placeHolder="Select State"
                        value={stateid}
                        defaultValue={stateid}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <CitySelect
                        countryid={101}
                        stateid={stateid.id}
                        onChange={(e: any) => {
                          setCityid(e);
                        }}
                        placeHolder="Select City"
                        value={cityid}
                        defaultValue={cityid}
                      />
                    </div>
                  </div>
                </div>

                {/* Work Experience Section */}
                <div className="border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Work Experience
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                    {/* Current Employer Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Employer
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
                  </div>
                </div>

                {/* Education Section */}
                <div className="border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Education
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* UG Course Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        UG Course
                      </label>
                      <Select
                        options={ugdegree}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.id.toString()}
                        onChange={(selectedOption: any) => {
                          formik.setFieldValue(
                            "education.ugCourse",
                            selectedOption?.name || ""
                          );
                        }}
                        value={ugdegree.find(
                          (degree: any) =>
                            degree.name === formik.values.education.ugCourse
                        )}
                      />
                    </div>

                    {/* PG Course Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PG Course
                      </label>
                      <Select
                        options={pgdegree}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.id.toString()}
                        onChange={(selectedOption: any) => {
                          formik.setFieldValue(
                            "education.pgCourse",
                            selectedOption?.name || ""
                          );
                        }}
                        value={pgdegree.find(
                          (degree: any) =>
                            degree.name === formik.values.education.pgCourse
                        )}
                      />
                    </div>

                    {/* Post PG Course Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Post PG Course
                      </label>
                      <Select
                        options={postpgdegree}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.id.toString()}
                        onChange={(selectedOption: any) => {
                          formik.setFieldValue(
                            "education.postPgCourse",
                            selectedOption?.name || ""
                          );
                        }}
                        value={postpgdegree.find(
                          (degree: any) =>
                            degree.name === formik.values.education.postPgCourse
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Additional Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                    {/* Postal Address Field */}
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

                    {/* Tags Field */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
    Tags
  </label>
 
  <CreatableSelect
  isMulti
  options={tags.filter((tag: any) => {
    if (Roletype.Type === "superadmin") {
      // Superadmin can access all tags
      return true;
    } else if (Roletype.Type === "client") {
      // Clients can only access tags they created
      return tag.Created_By === Roletype.id;
    }
    // Exclude tags if no conditions match
    return false;
  })}
  getOptionLabel={(option: any) => option.Tag_Name || option.label}
  getOptionValue={(option: any) => option.id?.toString() || option.value}
  onChange={(selectedOptions: any) => {
    formik.setFieldValue("tags", selectedOptions);
  }}
  onCreateOption={async (inputValue: string) => {
    try {
      const response: any = await createtagapicall({ Tag_Name: inputValue });
      if (response.success) {
        const newTag = response.result;
        setTags([...tags, newTag]);
        formik.setFieldValue("tags", [...formik.values.tags, newTag]);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  }}
  value={formik.values.tags}
/>
</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editMode ? "Update Candidate" : "Add Candidate"}
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

        
<div>
    <input
      type="text"
      placeholder="search by name"
      className="border border-gray-300 p-2"
      onChange={(e) => {
        setFilters({ ...filters, name: e.target.value });
      }}
    />
  </div>

      </section>
      
      {/* show table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg">
  <thead>
    <tr className="bg-gray-100 border-b border-gray-200">
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">SR.NO.</th>
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
        
        Resume Title
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
        
        Work Experience
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
       
        Current CTC
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
        
        Current Location
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
       
        State
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
        
        Preferred Location
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
       
        DOB
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
        
        Age
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
       
        Designation
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
       
        Current Employer
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
        
        Postal Address
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
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider flex flex-col">
        
        Reasons
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
       
        Tags
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <tbody>{candidateTabledata}</tbody>
</table>
<div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
    <div>
      <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
    </div>
    <div className="space-x-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:bg-gray-200 rounded p-2 text-sm"
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:bg-gray-200 rounded p-2 text-sm"
      >
        Next
      </button>
    </div>
  </div>
      </div>
    </Layout>
  );
};

export default Candidate;
