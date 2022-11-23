import apiService from "../apiService";

const registerUser = async (userData) => {
  await apiService.post("/user/register", userData, { withCredentials: true });
};

const loginUser = async (userData) => {
  const { data } = await apiService.post("/user/login", userData, { withCredentials: true });
  if (data) {
    localStorage.setItem("message", JSON.stringify(data));
  }
};

const logout = async () => {
  localStorage.removeItem("message");
  await apiService.get("/user/logout", { withCredentials: true });
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
