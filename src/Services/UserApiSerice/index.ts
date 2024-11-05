import apiInstance from "../apiservice/apiInstance";
import {loginauth as string} from "./userinterface";
// register api service
interface registerauth {
  FirstName: String;
  LastName: String;
  Email: String;
  Password: String;
  Phone: String;
}

export const registerapiservice = async (payload: registerauth) => {
  const response = await apiInstance.post("/user/register", payload);
  return response.data;
};

// login api service
interface loginauth {
  [x: string]: any;
  Email: String;
  Password: String;
}

export const loginapiservice = async (data: loginauth) => {
  const response = await apiInstance.post<loginauth>("/user/login", data);
  return response.data;
};

// forget Password
interface forgetPassword {
  Email: String;
}

export const forgetpasswordapicall = async (data: forgetPassword) => {
  const response = await apiInstance.post("/user/forget-password", data);
  return response.data;
};
