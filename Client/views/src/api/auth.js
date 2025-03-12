import axios from "axios";
import API_BASE_URL from "../config";  // Ensure this points to your backend

/** Register User */
export const register = async (email, password, role_id) => {
    return axios.post(`${API_BASE_URL}/auth/register`, { email, password, role_id });
};

/** Login User */
export const login = async (email, password) => {
    return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

/** Verify OTP */
export const verifyOTP = async (email, token) => {
    return axios.post(`${API_BASE_URL}/auth/verify-2fa`, { email, token });
};
