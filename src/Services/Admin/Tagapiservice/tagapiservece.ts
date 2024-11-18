import apiInstance from "../../apiservice/apiInstance";

// create tags api call

export const createtagapicall = async (data: any) => {
  const response = await apiInstance.post("/tag/create-tag", data);
  return response.data;
};

// fetch tags
export const fetchtagapicall = async () => {
  const response = await apiInstance.get("/tag/fetch-tag");
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
