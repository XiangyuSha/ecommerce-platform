import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductBrowse";
import StaffDashboard from "./pages/StaffPanel";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
    const [forceRefresh, setForceRefresh] = useState(0); // ✅ Add refresh state

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/productlists" element={<ProductList forceRefresh={forceRefresh} />} />
                <Route path="/staff" element={<StaffDashboard setForceRefresh={setForceRefresh} />} />
            </Routes>
        </Router>
    );
}

export default App;
