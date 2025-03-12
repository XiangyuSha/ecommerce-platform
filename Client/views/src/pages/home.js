import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            {/* 主页标题 */}
            <Typography variant="h3" align="center" gutterBottom>
                Welcome to Our Store
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Browse our products, manage inventory, or place an order.
            </Typography>

            {/* 快捷操作按钮 */}
            <Box display="flex" justifyContent="center" gap={2} my={3}>
                <Button variant="contained" color="primary" onClick={() => navigate("/productlists")}>
                    View Products
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/staff")}>
                    Staff Panel
                </Button>
                <Button variant="contained" color="success" onClick={() => navigate("/admin")}>
                    Admin Dashboard
                </Button>
            </Box>

            {/* 主页卡片布局 */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                            <Typography variant="h5">🛒 Products</Typography>
                            <Typography color="textSecondary">Browse and purchase products.</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                            <Typography variant="h5">👨‍💼 Staff</Typography>
                            <Typography color="textSecondary">Manage product inventory.</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <CardContent>
                            <Typography variant="h5">⚙️ Admin</Typography>
                            <Typography color="textSecondary">Manage users and settings.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
