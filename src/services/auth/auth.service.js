import api from "../api";

/**
 * 1️⃣ Check email tồn tại chưa
 * POST /api/auth/check-email
 */
export const checkEmail = (email) => {
  return api.post("/auth/check-email", { email });
};

/**
 * 2️⃣ Register
 * POST /api/auth/register
 */
export const register = ({ email, password, repeatPassword }) => {
  return api.post("/auth/register", {
    email,
    password,
    repeatPassword,
  });
};

/**
 * 3️⃣ Send OTP
 * POST /api/auth/send-otp
 */
export const sendOtp = ({ email, type }) => {
  return api.post("/auth/send-otp", {
    email,
    type, // ví dụ: "REGISTER"
  });
};

/**
 * 4️⃣ Verify Email
 * POST /api/auth/verify-email
 */
export const verifyEmail = ({ email, code }) => {
  return api.post("/auth/verify-email", {
    email,
    code,
  });
};

/**
 * 5️⃣ Resend OTP
 * POST /api/auth/resend-otp
 */
export const resendOtp = ({ email, type }) => {
  return api.post("/auth/resend-otp", {
    email,
    type,
  });
};

/**
 * Login
 * POST /api/auth/login
 */
export const login = ({ email, password }) => {
  return api.post("/auth/login", {
    email,
    password,
  });
};
