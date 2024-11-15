import apiInstance from "../../apiservice/apiInstance";

// create tags api call

export const createtagapicall = async () => {
  const response = await apiInstance.post("");
  return response.data;
};

// fetch tag api call
export const fetchtagapicall = async () => {
  const response = await apiInstance.get("");
  return response.data;
};

// remove tag api call
export const removetagapicall = async () => {
  const response = await apiInstance.delete("");
  return response.data;
};

// update tag api call

export const updatetagapicall = async () => {
  const response = await apiInstance.put("");
  return response.data;
};
