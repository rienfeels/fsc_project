import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://172.29.5.15:8000/api/",
  timeout: 5000, // timeout after 5 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiInstance;
