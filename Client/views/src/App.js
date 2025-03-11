import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffPanel";
import CustomerDashboard from "./pages/ProductBrowse";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/staff" element={<StaffDashboard />} />
                <Route path="/customer" element={<CustomerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
