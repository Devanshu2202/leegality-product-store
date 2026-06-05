import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/productApi";

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getProducts();

            console.log("data", data

            )

            setProducts(data.products);
        } catch (err) {
            setError("Failed to fetch products");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold">
                Product Listing Page
            </h1>

            <div className="space-y-2">
                {products.map((product) => (
                    <p key={product.id}>{product.title}</p>
                ))}
            </div>
        </div>
    );
};

export default ProductListingPage;