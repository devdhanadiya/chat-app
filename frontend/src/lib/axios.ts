import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_API_URL}/api`
      : "http://localhost:8000/api",
  withCredentials: true,
});

export default axiosInstance;
