import apiInstance from "../../apiservice/apiInstance";
export const fetchReasonleavingapicall = async (): Promise<any> => {
  const response = await apiInstance.get("/reason/get-reason");
  return response.data;
};

// createReasonleavingjobapicall
export const createReasonleavingjobapicall = async (
  data: any
): Promise<any> => {
  const response = await apiInstance.post("/v1/create", data);
  return response.data;
};

export const createReasonapicall = async (data: any):Promise<any>=> {
  const response = await apiInstance.post("/reason/create-reason", data);
  return response.data;
};
