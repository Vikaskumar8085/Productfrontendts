import apiInstance from "../../apiservice/apiInstance";

// create client

export const createclietapicall = async (data: any) => {
  const response = await apiInstance.post<any>("/client/create-client", data);
  return response.data;
};

// fetch clients

export const fetchclientapicall = async () => {
  const response = await apiInstance.get("/client/fetch-client");
  return response.data;
};

export const editclientapicall = async (id:any,data:any) => {
  const response = await apiInstance.put(`/client/edit-client/${id}`,data);
  return response.data;
};

// delete client

export const deleteclientapicall = async (id:any) => {
  const response = await apiInstance.delete(`/client/remove-client/${id}`);
  return response.data;
};

export const fetchHasAnswered = async () => {
  const response = await apiInstance.get("/client/fetch-hasanswer");
  return response.data;
}