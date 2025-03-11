import axios from "axios";
import API_BASE_URL from "../config";

export const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_BASE_URL}/api/orders`, { headers: { Authorization: `Bearer ${token}` } });
};
