
import React, { useState, useEffect } from "react";
import Layout from "../../../component/Layout/Layout";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import Modal from "../../../Common/Modal/Modal";
import { useFormik } from "formik";
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
import { fetchtagapicall } from "../../../Services/Admin/Tagapiservice/tagapiservece";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteDialog from "../../../Common/DeleteDialog/DeleteDialog";
import {fetchdegreebynamesapicall,fetchdegreeapicall} from "../../../Services/Admin/DegreeProgram/index"
import Select from 'react-select'
const Candidate: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [ugdegree, setUgdegree] = useState<[]>([]);
  const [pgdegree, setPgdegree] = useState<[]>([]);
  const [postpgdegree, setPostpgdegree] = useState<[]>([]);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  const [tags, setTags] = useState<[]>([]);
  const [designation, setDesignation] = useState<[]>([]);
  const [region, setRegion] = useState<any>("");
  const [countryid, setCountryid] = useState<any>(0);
  const [stateid, setstateid] = useState<any>(0);
  const [cityid, setCityid] = useState<any>(0);
  const dispatch = useAppDispatch();
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
      reason1: "",
      reason2: "",
      reason3: "",
      designationId: 0 as number,
      tags: [] as any[],
      education: {
        ugCourse: "",
        pgCourse: "",
        postPgCourse: "",
      },
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        values.state = stateid.name;
        values.country = countryid.name;
        values.city = cityid.name;

        
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
        toast.error("Something went wrong");
        console.log(error);
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
      const response = await fetchcandidatetapicall();
      if (response.success) {
        dispatch(setCandidate(response.result));
      }
    } catch (error: any) {
      console.log(error?.message);
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
  
  const handleEdit = async (candidate: any) => {
    setSelectedCandidate(candidate);
    setEditMode(true);
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
      reason1: candidate.reason1,
      reason2: candidate.reason2,
      reason3: candidate.reason3,
      designationId: candidate.designationId,
      tags: candidate.tags.map((tag: any) => tag.id),
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
    const response:any = await fetchdegreeapicall();
    if (response.success) {
      //search UG
      const ugdegree = response.result.filter((degree: any) => degree.level === "UG");
      setUgdegree(ugdegree);
      //search PG
      const pgdegree = response.result.filter((degree: any) => degree.level === "PG");
      setPgdegree(pgdegree);
      //search POST PG
      const postpgdegree = response.result.filter(
        (degree: any) => degree.level === "Post-PG"
      );
      setPostpgdegree(postpgdegree);
    }
  };
  React.useEffect(() => {
    fetchdegree();
  }, []);
  
  const candidateTabledata = candidatevalues.map((item: any, index: any) => {
    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {index + 1}
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
          {item.education.ugCourse}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.education.pgCourse}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.education.postPgCourse}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.reason1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.reason2}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.reason3}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.tags.map((tag: any, idx: number) => (
            <div key={idx}>{tag.Tag_Name}</div>
          ))}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          
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
        </td>
      </tr>
    );
  });

  useEffect(() => {
    fetchcandidatedata();
    fetchtags();
    fetchdesignations();
  }, [0]);

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


    return (
      <Layout>
        <Breadcrumb pageName="Candidate" />
        <section className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200">
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="bg-white capitalize border py-1 px-3 "
          >
            add candidate
          </button>
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
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <CountrySelect
                        onChange={(e: any) => {
                          setCountryid(e);
                        }}
                        placeHolder="Select Country"
                        region={region}
                        value={countryid} // Add this line
                        defaultValue={countryid} // Add this line for initial va
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <StateSelect
                        countryid={countryid.id}
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
                        countryid={countryid.id}
                        stateid={stateid.id}
                        onChange={(e: any) => {
                          setCityid(e);
                        }}
                        placeHolder="Select City"
                        value={cityid}
                        defaultValue={cityid}
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

                      <Select
                        options={designation}
                        getOptionLabel={(option: DesignationType) =>
                          option.title
                        }
                        getOptionValue={(option: DesignationType) =>
                          option.id.toString()
                        } // Convert id to string
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
        </section>
        {/* show table */}
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
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
                  Age
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