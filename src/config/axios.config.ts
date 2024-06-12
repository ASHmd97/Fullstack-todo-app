import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todoapp-api-au8u.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

export default axiosInstance;
