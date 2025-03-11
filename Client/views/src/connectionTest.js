import axios from "axios";
import API_BASE_URL from "./config";

let token = ""; // 存储 JWT 令牌

// **1. 登录，获取 JWT**
export const loginAndGetToken = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`);
        token = response.data.token;  // 存储 JWT
        console.log("Received Token:", token);
    } catch (error) {
        console.error("Login Error:", error);
    }
};

// **2. 使用 JWT 访问受保护 API**
export const testJWT = async () => {
    try {
        if (!token) {
            console.error("No token available, please login first.");
            return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/test-jwt`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("API Response:", response.data);
    } catch (error) {
        console.error("JWT Test Error:", error);
    }
};
