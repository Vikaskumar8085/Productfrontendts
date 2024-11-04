import apiInstance from "../apiservice/apiInstance";
import { loginauth as string } from "./userinterface";
// register api service
interface registerauth {
  FirstName: String;
  LastName: String;
  Email: String;
  Password: String;
  Phone: Number;
}

export const registerapiservice = async (payload: registerauth) => {
  const response = await apiInstance.post<registerauth>("");
  return response.data;
};

// login api service
interface loginauth {
  Email: String;
  Password: String;
}

export const loginapiservice = async (data: loginauth) => {
  const response = await apiInstance.post<loginauth>("", data);
  return response.data;
};
