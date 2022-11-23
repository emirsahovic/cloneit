import axios from "axios";

const defaultOptions = {
  baseURL: "http://192.168.50.87:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

let apiService = axios.create(defaultOptions);

apiService.defaults.withCredentials = true;

export default apiService;
