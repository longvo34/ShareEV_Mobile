import api from "../api";

export const checkEmail = (email) => {
  return api.post("/auth/check-email", { email });
};

export const register = ({ email, password, repeatPassword }) => {
  return api.post("/auth/register", {
    email,
    password,
    repeatPassword,
  });
};

export const sendOtp = ({ email, type }) => {
  return api.post("/auth/send-otp", {
    email,
    type,
  });
};

export const verifyEmail = ({ email, code }) => {
  return api.post("/auth/verify-email", {
    email,
    code,
  });
};

export const resendOtp = ({ email, type }) => {
  return api.post("/auth/resend-otp", {
    email,
    type,
  });
};

export const login = ({ email, password }) => {
  return api.post("/auth/login", {
    email,
    password,
  });
};

export const refreshTokenApi = (token, refreshToken) => {
  return api.post("/auth/refresh-token", {
    token,
    refreshToken,
  });
};
