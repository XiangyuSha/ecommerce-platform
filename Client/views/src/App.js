import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductBrowse";
import StaffDashboard from "./pages/StaffDashboard";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AdminDashboard from "./pages/AdminDashboard"

function App() {
    const [forceRefresh, setForceRefresh] = useState(0); // Add refresh state

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product-lists" element={<ProductList forceRefresh={forceRefresh} />} />
                <Route path="/staff-dashboard" element={<StaffDashboard setForceRefresh={setForceRefresh} />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
