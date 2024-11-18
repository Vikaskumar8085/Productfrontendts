import apiInstance from "../../apiservice/apiInstance";

// create client

export const createclietapicall = async (data: any) => {
  const response = await apiInstance.post<any>("/api/", data);
  return response.data;
};

// fetch clients

export const fetchclientapicall = async () => {
  const response = await apiInstance.get("/client/fetch-client");
  return response.data;
};
