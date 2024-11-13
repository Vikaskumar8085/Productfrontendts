import {DesignationType} from "../../Types";
import apiInstance from "../apiservice/apiInstance";

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

export const removedesignationapicall = async (value:number) => {
  const response: any | null = await apiInstance.delete("/designation/delete-designation/"+value);
  return response.data;
};

export const updatedesignationapicall = async (id: number, value: { title: string }) => {
  const response = await apiInstance.put(`/designation/update-designation/${id}`, value);
  return response.data;
};
