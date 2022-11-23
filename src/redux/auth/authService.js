import apiService from "../apiService";

const registerUser = async (userData) => {
  await apiService.post("/register", userData, { withCredentials: true });
};
const loginUser = async (userData) => {
  await apiService.post("/login", userData, { withCredentials: true });
};

const authService = {
  registerUser,
  loginUser,
};

export default authService;
