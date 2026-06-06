import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate();


    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer rounded-lg border p-4 shadow-sm"
        >
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full rounded-md object-cover"
            />

            <h3 className="mt-3 font-semibold">
                {product.title}
            </h3>

            <p className="mt-2 text-lg font-bold">
                ${product.price}
            </p>

            <p className="text-yellow-500">
                ⭐ {product.rating}
            </p>
        </div>
    );
};

export default ProductCard;