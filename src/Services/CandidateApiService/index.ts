import apiInstance from "../apiservice/apiInstance";
import {addproductinterface} from "./producttypes";

// create product api service
export const addproductapicall = async (data: any) => {
  const repsonse: any | null = await apiInstance.post<addproductinterface>(
    "/product/add-product",
    data
  );
  return repsonse?.data;
};
// fetch product api service

// export const fetchproductapicall = async () => {
//   const response: any | null = await apiInstance.get("/product/fetch-product");
//   return response.data;
// };

// remove candidate api service

// export const RemoveCandidateapicall = async () => {
//   const response: any | null = await apiInstance.delete("/");
//   return response.data;
// };

// edit candidate api service

// export const updatecandidateapicall = async () => {
//   const response: any | null = await apiInstance.put("/");
//   return response.data;
// };
