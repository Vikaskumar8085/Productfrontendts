import apiInstance from "../../apiservice/apiInstance";


// fetch client security
export const fetchdashboardDataApicall = async () => {
  const response = await apiInstance.get("/dashboard/dashboard-data");
  return response.data;
};

export const fetchdashboardDataApicall1 = async () => {
    const response = await apiInstance.get("/dashboard/dashboard-data-1");
    return response.data;
  };