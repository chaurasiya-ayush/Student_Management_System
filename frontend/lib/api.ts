import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do not "swallow" the error here
    return Promise.reject(error); 
  }
);
export default api;
