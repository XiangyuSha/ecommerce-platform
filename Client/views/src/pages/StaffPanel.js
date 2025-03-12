import API_BASE_URL from "../config";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, TextField, Button, Card, CardContent, Grid, Box } from "@mui/material";

const StaffDashboard = ({ setForceRefresh }) => {
  const [products, setProducts] = useState([]);
  const [newStock, setNewStock] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const updateStock = (id) => {
    axios.put(`${API_BASE_URL}/products/${id}`, { stock_quantity: newStock[id] || 0 }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => {
        alert("✅ Stock updated successfully!");
        setForceRefresh((prev) => prev + 1); // ✅ Notify the customer product list to update
        fetchProducts(); // ✅ Immediately update staff view
      })
      .catch((err) => console.error("❌ Error updating stock:", err));
  };

  const addProduct = () => {
    axios
      .post(`${API_BASE_URL}/products`, {
        ...newProduct,
        image_url: newProduct.image_url || "https://static.vecteezy.com/system/resources/previews/002/186/712/non_2x/new-product-tag-sticker-free-vector.jpg"
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => {
        alert("✅ Product added successfully!");
        setNewProduct({ name: "", description: "", price: "", stock_quantity: "", image_url: "" });
        setForceRefresh((prev) => prev + 1); // ✅ Notify customer product list
        fetchProducts(); // ✅ Immediately update staff view
      })
      .catch((err) => console.error("❌ Error adding product:", err));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Staff Panel - Manage Products</Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ padding: 2, minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <CardContent>
                <Typography variant="h6">{product.name} - Stock: {product.stock_quantity}</Typography>
                <TextField
                  label="New Stock"
                  type="number"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  onChange={(e) => setNewStock({ ...newStock, [product.id]: e.target.value })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1 }}
                  fullWidth
                  onClick={() => updateStock(product.id)}
                >
                  Update Stock
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Add New Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" fullWidth multiline rows={2} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Price" type="number" fullWidth value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Stock Quantity" type="number" fullWidth value={newProduct.stock_quantity} onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })} />
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} fullWidth onClick={addProduct}>
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default StaffDashboard;
