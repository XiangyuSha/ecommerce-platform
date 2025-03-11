import { useEffect, useState } from "react";
import { fetchOrders } from "../api/orders";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await fetchOrders();
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders");
            }
        };
        loadOrders();
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>{order.product_id} - {order.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
