import axios from "axios";
import API_BASE_URL from "../config";

export const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_BASE_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } });
};