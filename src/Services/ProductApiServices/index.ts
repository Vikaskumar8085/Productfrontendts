import apiInstance from "../apiservice/apiInstance";

// create product api service
export const addproductapicall = async (data: any) => {
  const repsonse: any | null = await apiInstance.post<any>(
    "/product/add-product",
    data
  );
  return repsonse?.data;
};
// fetch product api service

export const fetchproductapicall = async () => {
  const response: any | null = await apiInstance.get("/product/fetch-product");
  return response.data;
};
