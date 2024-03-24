import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/",
  timeout: 5000, // timeout after 5 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiInstance;
