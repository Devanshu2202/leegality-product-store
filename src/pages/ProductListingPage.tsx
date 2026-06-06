import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts, getCategories, getProductsByCategory } from "../api/productApi";
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

    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const PRODUCTS_PER_PAGE = 12;

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        setCurrentPage(1);
    }, [
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
    ]);

    useEffect(() => {
        if (!selectedCategory) {
            fetchProducts();
        } else {
            fetchProductsByCategoryHandler(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchProductsByCategoryHandler = async (
        category: string
    ) => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getProductsByCategory(category);

            setProducts(data.products);
        } catch (err) {
            setError("Failed to fetch products");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

    const filteredProducts = products.filter(

        (product) => {
            const brandMatch =
                !selectedBrand ||
                product.brand === selectedBrand;

            const minPriceMatch =
                !minPrice ||
                product.price >= Number(minPrice);

            const maxPriceMatch =
                !maxPrice ||
                product.price <= Number(maxPrice);

            return (
                brandMatch &&
                minPriceMatch &&
                maxPriceMatch
            );
        }
    );

    const startIndex =
        (currentPage - 1) * PRODUCTS_PER_PAGE;

    const paginatedProducts =
        filteredProducts.slice(
            startIndex,
            startIndex + PRODUCTS_PER_PAGE
        );

    const totalPages = Math.ceil(
        filteredProducts.length /
        PRODUCTS_PER_PAGE
    );

    const brands = [...new Set(products.map((product) => product.brand))];

    return (
        <div className="p-6 ">
            <h1 className="mb-4 text-3xl font-bold">
                Product Listing Page
            </h1>



            <div className="flex gap-6">
                <aside className="w-64 border rounded-lg p-4">
                    <h2 className="mb-4 text-xl font-semibold">
                        Filters
                    </h2>

                    <div className="space-y-4">
                        <select
                            className="w-full border p-2 rounded"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.slug}
                                    value={category.slug}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="w-full border p-2 rounded"
                            value={selectedBrand}
                            onChange={(e) =>
                                setSelectedBrand(e.target.value)
                            }
                        >
                            <option value="">
                                All Brands
                            </option>



                            {brands.map((brand) => (
                                <option
                                    key={brand}
                                    value={brand}
                                >
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                            className="rounded border px-4 py-2"
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                            className="rounded border px-4 py-2"
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductListingPage;