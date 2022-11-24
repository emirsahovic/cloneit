import apiService from "../apiService";

const getUsersProfile = async () => {
  const { data } = await apiService.get("/user");
  return data;
};

const userService = {
  getUsersProfile,
};

export default userService;
