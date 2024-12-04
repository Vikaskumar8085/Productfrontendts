import apiInstance from "../../apiservice/apiInstance";

// add client security
export const createclientsecurityapicall = async (data: any) => {
  const response: string | any = await apiInstance.post(
    "/client-security/create",
    data
  );
  return response.data;
};

// fetch client security
export const fetchclientsecuriytapicall = async () => {
  const response = await apiInstance.get("/client-security/fetch");
  return response.data;
};

// remove client security
export const removeclientsecurityapicall = async (
  id: Axios.AxiosXHRConfigBase<unknown> | undefined
) => {
  const response = await apiInstance.delete("/client-security/remove", id);
  return response.data;
};

export const updateclientsecurityapicall = async (data: any) => {
  const response = await apiInstance.put(
    `/client-security/edit${data.id}`,
    data.payload
  );

  return response.data;
};
export const checkclientsecurityapicall = async (data: any) => {
  const response = await apiInstance.post(`/client-security/check`, data);
  return response.data;
}

export const verifyanswerapicall = async (data: any) => {
  const response = await apiInstance.post(`/client-security/verify`, data);
  return response.data;
}
