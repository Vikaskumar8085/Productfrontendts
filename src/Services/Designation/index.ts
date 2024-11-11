import apiInstance from "../apiservice/apiInstance";

// // add Designation
export const addDesignationapicall = async () => {
  const response: any | null = await apiInstance.post<any>("/api");
  return response.data;
};

// // fetch designation api call
// export const fetchdesignationapicall = async () => {
//   const response: any | null = await apiInstance.get();
//   return response.data;
// };

// export const removedesignationapicall = async () => {
//   const response: any | null = await apiInstance.delete();
//   return response.data;
// };

// export const updatedesignationapicall = async () => {
//   const response: any | null = await apiInstance.put();
//   return response.data;
// };
