import api from "../api";

export const getProfile = () => {
  return api.get("/user/profile");
};

export const updateProfile = (data) => {
  return api.put("/user/profile", data);
};
