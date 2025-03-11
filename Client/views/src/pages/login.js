import { useState } from "react";
import { login, verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            alert(response.data.message);
            setShowOTP(true); // ✅ Ask for OTP after successful password check
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyOTP(email, otp);
            localStorage.setItem("token", response.data.token);

            // ✅ Redirect user based on role
            if (response.data.role_id === 2) navigate("/admin");
            else if (response.data.role_id === 3) navigate("/staff");
            else navigate("/customer");

        } catch (error) {
            alert(error.response?.data?.message || "OTP Verification failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>

            {showOTP && (
                <form onSubmit={handleVerifyOTP}>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
        </div>
    );
};

export default Login;
