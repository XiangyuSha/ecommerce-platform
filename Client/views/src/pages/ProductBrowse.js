import API_BASE_URL from "../config";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

const ProductList = ({ forceRefresh }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [forceRefresh]); // ✅ Dependency on `forceRefresh` to trigger re-fetch

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#2C3E50",
          textAlign: "center",
        }}
      >
        Product List
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image_url || "https://via.placeholder.com/200"}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.name} - ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Stock: {product.stock_quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
