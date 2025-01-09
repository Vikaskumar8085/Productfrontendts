import apiInstance from "../apiservice/apiInstance";
import {forgetPassword, loginauth, registerauth} from "./userinterface";
// register api service
export const registerapiservice = async (payload: registerauth) => {
  const response = await apiInstance.post("/user/register", payload);
  return response.data;
};
// login api service
export const loginapiservice = async (data: loginauth) => {
  const response = await apiInstance.post<loginauth>("/user/login", data);
  return response.data;
};
export const logoutapicall = async () => {
  const response = await apiInstance.post("/user/logout");
  return response.data;
}
export const refreshapicall = async () => {
  const response = await apiInstance.get("/user/refresh-token");
  return response.data;
}
// forget Password
export const forgetpasswordapicall = async (data: forgetPassword) => {
  const response = await apiInstance.post("/user/forget-password", data);
  return response.data;
};
export const profileapicall = async () => {
  const response = await apiInstance.get("/user/profile");
  return response.data;
};
export const updateprofileapicall = async (data: any) => {
  const response = await apiInstance.put("/user/update-profile", data);
  return response.data;
};

// get user types
export const getUserapiCall = async () => {
  const response = await apiInstance.get("/user/get-user");
  return response.data;
};
