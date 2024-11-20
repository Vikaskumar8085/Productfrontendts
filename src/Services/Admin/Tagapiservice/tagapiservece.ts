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
export const removetagapicall = async (id:number) => {
  const response = await apiInstance.delete(`/tag/remove-tag/${id}`);
  return response.data;
};

// update tag api call

export const updatetagapicall = async (id:number,value:any) => {
  const response = await apiInstance.put(`/tag/update-tag/${id}`,value);
  return response.data;
};

// upload csv api call
export const uploadcsvapicall = async (data:any) => {
  const response = await apiInstance.post("/tag/import-tags",data);
  return response.data;
};
