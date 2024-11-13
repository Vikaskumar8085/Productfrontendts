import apiInstance from "../apiservice/apiInstance";
// create reason api call
export const createReasonapicall = async () => {
  const response: any | null = await apiInstance.post<any>("/api");
  return response.data;
};
