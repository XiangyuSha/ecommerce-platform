import API_BASE_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Container,
  Typography,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role_id);

      setSnackbar({
        open: true,
        message: "Login succeeded!",
        severity: "success",
      });

      setTimeout(() => {
        if (response.data.role_id === 4) navigate("/productlists");
        else if (response.data.role_id === 3) navigate("/staff");
        else if (response.data.role_id === 2) navigate("/admin");
      }, 1500); // 1.5秒后跳转
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Login failed",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "32px",
          fontWeight: "bold",
          color: "BLACK",
          textAlign: "center",
        }}
      >
        Login
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // ✅ 让 Snackbar 居中
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
