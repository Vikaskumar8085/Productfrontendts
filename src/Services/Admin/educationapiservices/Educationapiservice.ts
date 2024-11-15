import apiInstance from "../../apiservice/apiInstance";
// create education api call
export const createEducationapicall = async () => {
  const response = await apiInstance.post("");
  return response.data;
};

// fetch educatin api call
export const fetcheducationapicall = async () => {
  const response = await apiInstance.get("");
  return response.data;
};

// remove education api call

export const removeEducationapicall = async () => {
  const response = await apiInstance.delete("");
  return response.data;
};

// update education api call
export const updateEducationapicall = async () => {
  const response = await apiInstance.put("");
  return response.data;
};
