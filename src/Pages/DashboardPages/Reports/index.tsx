import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../Common/BreadCrumb/BreadCrumb";
import Layout from "../../../component/Layout/Layout";
import { setCandidate } from "../../../Redux/CandidateSlice/CandidateSlice";
import { fetchcandidatetapicall1 } from "../../../Services/Admin/CandidateApiService";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import { fetchreasionapicall } from "../../../Services/Admin/ReasonApiService/index";
import { fetchtagapicall } from "../../../Services/Admin/Tagapiservice/tagapiservece";
import { fetchdesignationapicall } from "../../../Services/Admin/Designation/index";
import Select from "react-select"; // Using react-select for multi-select dropdown
import { CSVLink } from "react-csv"; // CSV export
import { jsPDF } from "jspdf"; // PDF export
import autoTable from "jspdf-autotable"; // Importing jspdf-autotable plugin

const Report: React.FC = () => {
  const dispatch = useAppDispatch();
  const candidatevalues = useAppSelector((state) => state.candidate.value);

  // Define type for filter keys
  type FilterKeys = "reasonAnswer" | "tags" | "designation" | "workExpRange" | "currentCTC" | "city" | "state";

  // State for the filters
  const [filters, setFilters] = useState<Record<FilterKeys, any>>({
    reasonAnswer: [],
    tags: [],
    designation: [],
    workExpRange: "",
    currentCTC: "",
    city: "",
    state: "",
  });

  const [reasonOptions, setReasonOptions] = useState<{ value: number; label: string; options?: { value: number; label: string }[] }[]>([]);
  const [tagOptions, setTagOptions] = useState<{ value: number; label: string }[]>([]);
  const [designationOptions, setDesignationOptions] = useState<{ value: number; label: string }[]>([]);
  const [selectedReasons, setSelectedReasons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // Define the limit variable
  // Handler for selecting/deselecting options
  const handleReasonChange = (selected: any) => {
    setSelectedReasons(selected || []); // Store selected options
  };
  // Fetch data for reasons, tags, and designations
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        // Fetch Tags
        const tagsResponse: any = await fetchtagapicall();
        // Fetch Designations
        const designationResponse = await fetchdesignationapicall();
        // Fetch Reasons
        const reasonsResponse = await fetchreasionapicall();

        // Process tags data
        if (tagsResponse.success) {
          setTagOptions(tagsResponse.result.map((item: any) => ({ value: item.id, label: item.Tag_Name })));
        }

        // Process designations data
        if (designationResponse.success) {
          setDesignationOptions(designationResponse.result.map((item: any) => ({ value: item.id, label: item.title })));
        }

        // Process reasons data
        if (reasonsResponse.success) {
          const reasonData = reasonsResponse.result.map((item: any) => ({
            value: item.id,
            label: item.reason,
            options: item.ReasonAnswers.map((answer: any) => ({
              value: answer.id,
              label: answer.Reason_answer,
            })),
          }));
          setReasonOptions(reasonData);
        }
      } catch (error) {
        console.error("Error fetching filter data", error);
      }
    };

    fetchFiltersData();
  }, []);

  // Fetch candidate data with filters
  const fetchcandidatedata = async () => {
    try {
      const response = await fetchcandidatetapicall1({
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

  // Call fetchcandidatedata whenever filters change
  useEffect(() => {
    fetchcandidatedata();
  }, [filters, currentPage]);

  // Handle multi-select filter changes
  const handleMultiSelectChange = (selectedOptions: any, filterName: string) => {
    console.log('Selected options:', selectedOptions);
    setFilters({
      ...filters,
      [filterName]: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
    });
  };
  
  

  // Handle text filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, column: FilterKeys) => {
    setFilters({
      ...filters,
      [column]: e.target.value,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      reasonAnswer: [],
      tags: [],
      designation: [],
      workExpRange: "",
      currentCTC: "",
      city: "",
      state: "",
    });
  };

  // Filter candidates based on selected filters
  const filteredCandidates = candidatevalues?.filter((candidate: any) => {
    return (
        (selectedReasons.length === 0 || candidate.reasons?.some((reason: any) =>
            selectedReasons.some((selected: any) => selected.value === reason.ReasonAnswer?.id) // Match any of the selected ReasonAnswer.id values
          )) &&
      (filters.tags.length === 0 || filters.tags.some((tagId: any) => candidate.tags?.some((tag: any) => tag.id === tagId))) &&
      (filters.designation.length === 0 || filters.designation.includes(candidate.designation?.id)) &&
      (candidate.workExp?.toLowerCase().includes(filters.workExpRange) || filters.workExpRange === "") &&
      (candidate.ctc?.toString().toLowerCase().includes(filters.currentCTC) || filters.currentCTC === "") &&
      (candidate.city?.toLowerCase().includes(filters.city) || filters.city === "") &&
      (candidate.state?.toLowerCase().includes(filters.state) || filters.state === "")
    );
  });

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Candidate Report", 10, 10);
    autoTable(doc, {
      head: [["Reasons", "Tags", "Designation", "Work Experience", "CTC", "City", "State"]],
      body: filteredCandidates.map((candidate: any) => [
        candidate.reasons
        ? candidate.reasons.map((reason: any) => reason.ReasonAnswer?.Reason_answer).join(", ")
        : "", // Default to an empty string if no reasons exist
      // Join the tag names, separated by commas
        candidate.tags?.map((tag: any) => tag.Tag_Name).join(", "),
        candidate.designation?.title,
        candidate.workExp,
        candidate.currentCTC,
        candidate.city,
        candidate.state,
      ]),
    });
    doc.save("candidate_report.pdf");
  };

  return (
    <Layout>
      <Breadcrumb pageName="Candidate Report" />
      <section className="product gap-2 flex flex-row mb-3 p-2 bg-gray-200">
      <button
          onClick={clearFilters}
          className="m-3 px-4 py-2 bg-white rounded-sm text-md bg-red-500"
        >
          Clear Filters
        </button>
      <button onClick={generatePDF} className="m-3 px-4 py-2 bg-white rounded-sm text-md">
          Download PDF
        </button>
        <CSVLink
          data={filteredCandidates.map((candidate: any) => ({
            Reasons: candidate.reasons
      ? candidate.reasons.map((reason: any) => reason.ReasonAnswer?.Reason_answer).join(", ")
      : "", // Join reasons' answers with commas    
            Tags: candidate.tags?.map((tag: any) => tag.Tag_Name).join(", "),
            Designation: candidate.designation?.title,
            WorkExperience: candidate.workExp,
            CTC: candidate.currentCTC,
            City: candidate.city,
            State: candidate.state,
          }))}
          filename={"candidate_report.csv"}
        >
          <button className="m-3 px-4 py-2 bg-white rounded-sm text-md">Download CSV</button>
        </CSVLink>
      </section>

      {/* Filter Section */}
      <div className="mb-4 p-2">
        <div className="flex gap-4 flex-wrap">
          {/* Filters for reasons */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="reasons" className="text-sm font-medium mb-1">Reasons</label>
            <Select
  isMulti
  value={selectedReasons}
  onChange={handleReasonChange}
  options={reasonOptions}
/>


          </div>
          {/* Filters for tags */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="tags" className="text-sm font-medium mb-1">Tags</label>
            <Select
              id="tags"
              isMulti
              options={tagOptions}
              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "tags")}
              value={tagOptions.filter((option) => filters.tags.includes(option.value))}
            />
          </div>
          {/* Filters for designation */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="designation" className="text-sm font-medium mb-1">Designation</label>
            <Select
              id="designation"
              isMulti
              options={designationOptions}
              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "designation")}
              value={designationOptions.filter((option) => filters.designation.includes(option.value))}
            />
          </div>
          {/* Filters for work experience, CTC, city, and state */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="workExp" className="text-sm font-medium mb-1">Work Experience</label>
            <input
              id="workExp"
              type="text"
              className="border px-2 py-1 rounded"
              value={filters.workExpRange}
              onChange={(e) => handleFilterChange(e, "workExpRange")}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="ctc" className="text-sm font-medium mb-1">CTC</label>
            <input
              id="ctc"
              type="text"
              className="border px-2 py-1 rounded"
              value={filters.currentCTC}
              onChange={(e) => handleFilterChange(e, "currentCTC")}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="city" className="text-sm font-medium mb-1">City</label>
            <input
              id="city"
              type="text"
              className="border px-2 py-1 rounded"
              value={filters.city}
              onChange={(e) => handleFilterChange(e, "city")}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <label htmlFor="state" className="text-sm font-medium mb-1">State</label>
            <input
              id="state"
              type="text"
              className="border px-2 py-1 rounded"
              value={filters.state}
              onChange={(e) => handleFilterChange(e, "state")}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 mb-4">
        {/* CSV Export */}
        

        {/* PDF Export */}
        
      </div>

      {/* Candidate Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto max-h-full">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">SR.NO.</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Reasons</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tags</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Designation</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Work Experience</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">CTC</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">City</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">State</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates?.map((item: any, index: number) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{(currentPage - 1) * limit + index + 1} </td>
                <td className="px-4 py-2">
                  {item.reasons?.map((reason: any, index: number) => (
                    <span key={index}>
                      {reason.ReasonAnswer?.Reason_answer}
                      {index < item.reasons.length - 1 && ", "}
                      <br />
                    </span>
                  ))}
                </td>

                <td className="px-4 py-2">{item.tags?.map((tag: any) => tag.Tag_Name).join(", ")}</td>
                <td className="px-4 py-2">{item.designation?.title}</td>
                <td className="px-4 py-2">{item.workExp}</td>
                <td className="px-4 py-2">{item.currentCTC}</td>
                <td className="px-4 py-2">{item.city}</td>
                <td className="px-4 py-2">{item.state}</td>
              </tr>
            ))}
          </tbody>
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

export default Report;
