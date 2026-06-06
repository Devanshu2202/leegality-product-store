import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts, getCategories } from "../api/productApi";
import ProductCard from "../components/ProductCard";

type Category = {
    slug: string;
    name: string;
    url: string;
};

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // const [selectedCategory, setSelectedCategory] = useState("");
    // const [selectedBrand, setSelectedBrand] = useState("");

    // const [minPrice, setMinPrice] = useState("");
    // const [maxPrice, setMaxPrice] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();

            console.log("categories", data);

            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const filteredProducts = products.filter((product) => {
        if (!selectedCategory) {
            return true;
        }

        return product.category === selectedCategory;
    });

    return (
        <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold">
                Product Listing Page
            </h1>

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>

                {categories.map((category) => (
                    <option
                        key={category.slug}
                        value={category.slug}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductListingPage;