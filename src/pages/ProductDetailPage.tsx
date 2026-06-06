import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "../api/productApi";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId: string) => {
        try {
            setLoading(true);
            setError("");

            const data = await getProductById(productId);

            setProduct(data);
        } catch (err) {
            setError("Failed to fetch product");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading product...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 rounded bg-gray-200 px-4 py-2"
            >
                Back
            </button>

            <div className="grid gap-8 md:grid-cols-2">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full rounded-lg"
                />

                <div>
                    <h1 className="mb-4 text-3xl font-bold">
                        {product.title}
                    </h1>

                    <p className="mb-4 text-gray-600">
                        {product.description}
                    </p>

                    <p className="mb-2 text-xl font-bold">
                        ${product.price}
                    </p>

                    <p className="mb-2">
                        ⭐ {product.rating}
                    </p>

                    <p className="mb-2">
                        Brand: {product.brand}
                    </p>

                    <p>
                        Category: {product.category}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;