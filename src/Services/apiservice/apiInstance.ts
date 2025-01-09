import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.1.31:8000/api",
  
});

apiInstance.interceptors.request.use(
  (config) => {
    const getToken: string | null = localStorage.getItem("token");

    const token = getToken ? getToken : null;

    // Ensure headers exist before assigning Authorization
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error.message);
  }
);

export default apiInstance;
