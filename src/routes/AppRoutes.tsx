import { Routes, Route } from "react-router-dom";
import ProductListingPage from "../pages/ProductListingPage";
import ProductDetailPage from "../pages/ProductDetailPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
    );
};

export default AppRoutes;