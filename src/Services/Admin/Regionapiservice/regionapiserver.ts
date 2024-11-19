import apiInstance from "../../apiservice/apiInstance";
// create region
export const createregionapicall = async (data: any) => {
  const response = await apiInstance.post("/region/create-region", data);
  return response.data;
};

// fetch region
export const fetchregionapicall = async () => {
  const response = await apiInstance.get("/region/fetch-region");
  return response.data;
};

// remove region  api call
export const removeregionapicall = async () => {
  const response = await apiInstance.delete("");
  return response.data;
};
// edit region api call
export const editregionapicall = async () => {
  const response = await apiInstance.put("");
  return response.data;
};
