import apiInstance from "../../apiservice/apiInstance";
import {candidateTypes} from "./candidatetypes";

// create product api service
export const addproductapicall = async (data: any) => {
  //also add header as application/json
  const repsonse: any | null = await apiInstance.post(
    "/candidate/create-candidate",
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return repsonse?.data;
};
// fetch product api service

export const fetchcandidatetapicall = async () => {
  const response: any | null = await apiInstance.get(
    "/candidate/fetch-candidate"
  );
  return response.data;
};

// remove candidate api service

export const RemoveCandidateapicall = async (id:number) => {
  const response: any | null = await apiInstance.delete(`/candidate/remove-candidate/${id}`);
  return response.data;
};

// edit candidate api service

export const updatecandidateapicall = async (id:number,data:any) => {
  const response: any | null = await apiInstance.put(`/candidate/edit-candidate/${id}`,data);
  return response.data;
};

// download csv template

export const csvtemplateapicall = async () => {
  const response: any | null = await apiInstance.get(
    "/candidate/download-csv-candidate"
  );
  return response.data;
};

export const csvbulkuploadapicall = async (payload: any) => {
  const response: any | null = await apiInstance.post<any>(
    "/candidate/upload-csv-candidate",
    payload
  );
  return response.data;
};
