import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
                textAlign: "center",
                padding: "40px",
                minHeight: "120vh",
                backgroundImage: "url('https://blog-frontend.envato.com/cdn-cgi/image/width=2560,quality=75,format=auto/uploads/sites/2/2022/04/E-commerce-App-JPG-File-scaled.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white"
            }}
        >
            {/* sign in and register button */}
            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                <Button
                    variant="contained"
                    sx={{ marginRight: 1 }}
                    onClick={() => navigate("/login")}
                >
                    Sign In
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>
            </Box>

            {/* Title */}
            <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Welcome to Our Store
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
                Sign in to browse and purchase the latest items.
            </Typography>
        </Box>
    );
};

export default HomePage;
