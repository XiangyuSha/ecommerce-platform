import API_BASE_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Container,
  Typography,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(4); // 默认 Customer
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        role_id: role,
      });

      setSnackbar({ open: true, message: "Registration succeeded!", severity: "success" });

      setTimeout(() => navigate("/login"), 1500); // 1.5秒后跳转到登录
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Registration failed",
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
        Register
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
      <TextField
        fullWidth
        margin="normal"
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(Number(e.target.value))}
      >
        <MenuItem value={4}>Customer</MenuItem>
        <MenuItem value={3}>Staff</MenuItem>
        <MenuItem value={2}>Admin</MenuItem>
      </TextField>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
      >
        Register
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

export default Register;
