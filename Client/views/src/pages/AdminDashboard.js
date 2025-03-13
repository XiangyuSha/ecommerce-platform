import API_BASE_URL from "../config";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // Get product list
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found! User may not be logged in.");
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div style={{ maxWidth: "900px", margin: "auto", textAlign: "center", marginTop: "20px" }}>

            {/* Navigate bar */}
            <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/staff-dashboard")}
            sx={{
                position: "absolute",
                top: 20,
                right: 20
            }}
            >
            Manage products
            </Button>

            {/* Product table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminDashboard;
