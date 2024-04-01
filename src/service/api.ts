import axios from "axios";

const createAxiosInstance = () => {
  const token = localStorage.getItem("token");
  
  return axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export default createAxiosInstance;
