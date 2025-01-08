import apiInstance from "../../apiservice/apiInstance";
// create education api call
export const createEducationapicall = async (data: any) => {
  const response = await apiInstance.post("/degrees/create-degree", data);
  return response.data;
};

// fetch educatin api call
export const fetcheducationapicall = async () => {
  const response = await apiInstance.get("/degrees//fetch-degree");
  return response.data;
};

//degrees api call

export const removeEducationapicall = async (id:number) => {
  const response = await apiInstance.delete("/degrees/delete-degree/"+id);
  return response.data;
};

// update education api call
export const updateEducationapicall = async (data:any,id:number) => {
  const response = await apiInstance.put("/degrees/update-degree/"+id,data);
  return response.data;
};
