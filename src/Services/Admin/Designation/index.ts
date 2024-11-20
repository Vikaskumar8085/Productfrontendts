import {DesignationType} from "../../../Types";
import apiInstance from "../../apiservice/apiInstance";

// // add Designation
export const addDesignationapicall = async (value: DesignationType) => {
  const response: any | null = await apiInstance.post<any>(
    "/designation/create-designation",
    value
  );
  return response.data;
};

// fetch designation api call
export const fetchdesignationapicall = async () => {
  const response: any | null = await apiInstance.get(
    "/designation/fetch-designation"
  );
  return response.data;
};

export const removedesignationapicall = async (id:number) => {
  const response: any | null = await apiInstance.delete(`/designation/delete-designation/${id}`);
  return response.data;
};

export const updatedesignationapicall = async (value:DesignationType,id:number) => {
  const response: any | null = await apiInstance.put(`/designation/update-designation/${id}`,value);
  return response.data;
};
