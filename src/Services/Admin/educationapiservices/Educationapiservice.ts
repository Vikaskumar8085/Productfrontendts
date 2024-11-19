import apiInstance from "../../apiservice/apiInstance";
// create education api call
export const createEducationapicall = async (data: any) => {
  const response = await apiInstance.post("/education/create-education", data);
  return response.data;
};

// fetch educatin api call
export const fetcheducationapicall = async () => {
  const response = await apiInstance.get("/education/get-education");
  return response.data;
};

// remove education api call

export const removeEducationapicall = async () => {
  const response = await apiInstance.delete("/education/delete-education");
  return response.data;
};

// update education api call
export const updateEducationapicall = async () => {
  const response = await apiInstance.put("/education/update-education");
  return response.data;
};
