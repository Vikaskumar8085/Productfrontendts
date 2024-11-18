import apiInstance from "../../apiservice/apiInstance";

// create reason api call
export const createreasionapicall = async () => {
  const response: any | null = await apiInstance.post<any>("/api");
  return response.data;
};

// fetch reason api call
export const fetchreasionapicall = async () => {
  const response: any | null = await apiInstance.get<any>("/api");
  return response.data;
};

// remove reasion api call

export const removereasionapicall = async () => {
  const response: any | null = await apiInstance.delete("/api");
  return response.data;
};

// update reasion api call
export const updatereasionapicall = async () => {
  const response: any | null = await apiInstance.put("/");
  return response.data;
};
