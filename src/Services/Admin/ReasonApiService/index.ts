import apiInstance from "../../apiservice/apiInstance";

// create reason api call
export const createreasionapicall = async (data: any) => {
  console.log(data, "data")
  const response: any | null = await apiInstance.post<any>("/reason/create-reason", data);
  return response.data;
};

// fetch reason api call
export const fetchreasionapicall = async () => {
  const response: any | null = await apiInstance.get<any>("/reason/get-reason");
  return response.data;
};

// remove reasion api call

export const removereasionapicall = async (id:number) => {
  const response: any | null = await apiInstance.delete(`/reason/delete-reason/${id}`);
  return response.data;
};

// update reasion api call
export const updatereasionapicall = async (value:any,id:any) => {
  const response: any | null = await apiInstance.put(`/reason/update-reason/${id}`,value);
  return response.data;
};
