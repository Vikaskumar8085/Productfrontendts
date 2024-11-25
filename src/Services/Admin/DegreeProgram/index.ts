import apiInstance from "../../apiservice/apiInstance";

// create degree

export const createdegreeapicall = async (data: any) => {
  const response = await apiInstance.post<any>("/degrees/create-degree", data);
  return response.data;
};

// fetch clients

export const fetchdegreeapicall = async () => {
  const response = await apiInstance.get("/degrees/fetch-degree");
  return response.data;
};

export const fetchdegreebynamesapicall = async (name:any) => {
  const response = await apiInstance.get("/degrees/fetch-degree-name",name);
  return response.data;
};


