


export const getProducts = async () => {
    const response = await fetch(
        "https://dummyjson.com/products"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
};

export const getProductById = async (id: string) => {
    const response = await fetch(
        `https://dummyjson.com/products/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return response.json();
};

export const getCategories = async () => {
    const response = await fetch(
        "https://dummyjson.com/products/categories"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
};