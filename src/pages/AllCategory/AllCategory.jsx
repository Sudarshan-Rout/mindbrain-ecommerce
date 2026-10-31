import "./AllCategory.css";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import shoes1 from "../../assets/shoes1.jpg";
import shoes2 from "../../assets/shoes2.jpg";
import shoes3 from "../../assets/shoes3.jpg";
import shoes4 from "../../assets/shoes4.jpg";
import shoes5 from "../../assets/shoes5.jpg";

import tshirt1 from "../../assets/tshirt1.jpg";
import tshirt2 from "../../assets/tshirt2.jpg";
import tshirt3 from "../../assets/tshirt3.jpg";
import tshirt4 from "../../assets/tshirt4.jpg";
import tshirt5 from "../../assets/tshirt5.jpg";

import jacket1 from "../../assets/jacket1.avif";
import jacket2 from "../../assets/jacket2.avif";
import jacket3 from "../../assets/jacket3.avif";
import jacket4 from "../../assets/jacket4.avif";
import jacket5 from "../../assets/jacket5.avif";

import hat1 from "../../assets/hat1.jpg";
import hat2 from "../../assets/hat2.jpg";
import hat3 from "../../assets/hat3.jpg";
import hat4 from "../../assets/hat4.jpg";
import hat5 from "../../assets/hat5.jpg";


const API_URL = "http://localhost:8000";


/* ================= FALLBACK PRODUCTS ================= */

const fallbackProducts = [

    { id: "shoe-1", image: shoes1, name: "BJD shoe", price: 4, category: "shoes" },
    { id: "shoe-2", image: shoes2, name: "BJP shoe", price: 50, category: "shoes" },
    { id: "shoe-3", image: shoes3, name: "TVK shoe", price: 100, category: "shoes" },
    { id: "shoe-4", image: shoes4, name: "CONGRESS shoe", price: 20000, category: "shoes" },
    { id: "shoe-5", image: shoes5, name: "AMM ADIM PARTY shoe", price: 0, category: "shoes" },

    { id: "tshirt-1", image: tshirt1, name: "Graphic Tee", price: 999, category: "tshirts" },
    { id: "tshirt-2", image: tshirt2, name: "Plain Cotton Tee", price: 799, category: "tshirts" },
    { id: "tshirt-3", image: tshirt3, name: "V-Neck Tee", price: 899, category: "tshirts" },
    { id: "tshirt-4", image: tshirt4, name: "Ringer Tee", price: 849, category: "tshirts" },
    { id: "tshirt-5", image: tshirt5, name: "Striped Tee", price: 949, category: "tshirts" },

    { id: "jacket-1", image: jacket1, name: "Light Jacket", price: 1999, category: "jackets" },
    { id: "jacket-2", image: jacket2, name: "Denim Jacket", price: 2499, category: "jackets" },
    { id: "jacket-3", image: jacket3, name: "Bomber Jacket", price: 2999, category: "jackets" },
    { id: "jacket-4", image: jacket4, name: "Puffer Jacket", price: 3499, category: "jackets" },
    { id: "jacket-5", image: jacket5, name: "Leather Jacket", price: 3999, category: "jackets" },

    { id: "hat-1", image: hat1, name: "Classic Hat", price: 499, category: "hats" },
    { id: "hat-2", image: hat2, name: "Stylish Cap", price: 799, category: "hats" },
    { id: "hat-3", image: hat3, name: "Trendy Fedora", price: 699, category: "hats" },
    { id: "hat-4", image: hat4, name: "Summer Bucket Hat", price: 399, category: "hats" },
    { id: "hat-5", image: hat5, name: "Sporty Beanie", price: 299, category: "hats" },

];


/* ================= PRICE FUNCTION ================= */

const parsePrice = (price) => {

    if (typeof price === "number") return price;

    const value = String(price || "").replace(/[^0-9.]/g, "");

    return Number(value) || 0;

};


/* ================= ALL CATEGORY ================= */

function AllCategory() {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState(fallbackProducts);

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [category, setCategory] = useState("all");

    const [maxPrice, setMaxPrice] = useState("");

    const [sort, setSort] = useState("default");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    /* ================= DASHBOARD SEARCH SYNC ================= */

    useEffect(() => {

        setSearch(searchParams.get("search") || "");

    }, [searchParams]);


    /* ================= FETCH PRODUCTS ================= */

    useEffect(() => {

        const fetchAllProducts = async () => {

            setLoading(true);
            setError("");

            try {

                const endpoints = [
                    `${API_URL}/products`,
                    `${API_URL}/shoes`,
                    `${API_URL}/tshirts`,
                    `${API_URL}/jackets`
                ];

                const results = await Promise.allSettled(

                    endpoints.map((url) => fetch(url))

                );

                const allProducts = [];

                let successCount = 0;


                for (const result of results) {

                    if (result.status !== "fulfilled") continue;

                    try {

                        const response = result.value;

                        const data = await response.json();

                        if (!response.ok) continue;

                        successCount++;

                        const categoryProducts = Array.isArray(data)
                            ? data
                            : data.products || data.shoes || [];


                        if (Array.isArray(categoryProducts)) {

                            categoryProducts.forEach((product, index) => {

                                allProducts.push({

                                    id:
                                        product._id ||
                                        product.id ||
                                        `product-${index}`,

                                    image: product.image || "",

                                    name: product.name || "Unknown Product",

                                    price: parsePrice(product.price),

                                    category: String(
                                        product.category || "product"
                                    ).toLowerCase()

                                });

                            });

                        }

                    } catch (err) {

                        console.log("One product API failed:", err);

                    }

                }


                const combinedProducts = [...fallbackProducts];


                for (const product of allProducts) {

                    const duplicate = combinedProducts.some(

                        (existing) =>

                            existing.category === product.category &&

                            existing.name.trim().toLowerCase() ===
                            product.name.trim().toLowerCase()

                    );


                    if (!duplicate) {

                        combinedProducts.push(product);

                    }

                }


                setProducts(combinedProducts);


                if (successCount === 0) {

                    setError(
                        "Unable to load backend products. Showing available fallback products."
                    );

                }

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }

        };


        fetchAllProducts();

    }, []);


    /* ================= SEARCH FILTER SORT ================= */

    const filteredProducts = useMemo(() => {

        let result = [...products];


        // Search by name and category

        if (search.trim()) {

            const query = search.trim().toLowerCase();

            result = result.filter((product) =>

                product.name.toLowerCase().includes(query) ||

                product.category.toLowerCase().includes(query)

            );

        }


        // Category filter

        if (category !== "all") {

            result = result.filter(

                (product) => product.category === category

            );

        }


        // Maximum price filter

        if (maxPrice !== "") {

            result = result.filter(

                (product) => product.price <= Number(maxPrice)

            );

        }


        // Sorting

        if (sort === "low-high") {

            result.sort((a, b) => a.price - b.price);

        }

        else if (sort === "high-low") {

            result.sort((a, b) => b.price - a.price);

        }

        else if (sort === "name") {

            result.sort((a, b) => a.name.localeCompare(b.name));

        }


        return result;

    }, [products, search, category, maxPrice, sort]);


    /* ================= ADD TO CART ================= */

    const addToCart = async (item) => {

        const stored = localStorage.getItem("user");


        if (!stored) {

            setMessage("Please login to add to cart.");

            return;

        }


        try {

            const user = JSON.parse(stored);

            const response = await fetch(

                `${API_URL}/users/${user._id}/cart`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        productId: item.id,

                        name: item.name,

                        image: item.image,

                        price: item.price,

                        quantity: 1,

                        category: item.category

                    })

                }

            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Unable to add to cart."
                );

            }


            setMessage("Added to cart successfully.");

        } catch (error) {

            setMessage(error.message);

        }

    };


    /* ================= ADD TO WISHLIST ================= */

    const addToWishlist = async (item) => {

        const stored = localStorage.getItem("user");


        if (!stored) {

            setMessage("Please login to add to wishlist.");

            return;

        }


        try {

            const user = JSON.parse(stored);

            const response = await fetch(

                `${API_URL}/users/${user._id}/wishlist`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        productId: item.id,

                        name: item.name,

                        image: item.image,

                        price: item.price,

                        category: item.category

                    })

                }

            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Unable to add to wishlist."
                );

            }


            setMessage("Added to wishlist successfully.");

        } catch (error) {

            setMessage(error.message);

        }

    };


    /* ================= RESET FILTERS ================= */

    const resetFilters = () => {

        setSearch("");

        setCategory("all");

        setMaxPrice("");

        setSort("default");

    };


    /* ================= RETURN ================= */

    return (

        <div className="category-container">

            <h1>All Categories</h1>


            {/* SEARCH AND FILTERS */}

            <div className="filter-section">

                <input

                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="search-input"

                />


                <select

                    value={category}

                    onChange={(e) => setCategory(e.target.value)}

                >

                    <option value="all">All Categories</option>

                    <option value="shoes">Shoes</option>

                    <option value="tshirts">T-Shirts</option>

                    <option value="jackets">Jackets</option>

                    <option value="hats">Hats</option>

                </select>


                <input

                    type="number"

                    placeholder="Maximum Price"

                    value={maxPrice}

                    min="0"

                    onChange={(e) => setMaxPrice(e.target.value)}

                />


                <select

                    value={sort}

                    onChange={(e) => setSort(e.target.value)}

                >

                    <option value="default">Default Sorting</option>

                    <option value="low-high">
                        Price: Low to High
                    </option>

                    <option value="high-low">
                        Price: High to Low
                    </option>

                    <option value="name">
                        Name: A to Z
                    </option>

                </select>


                <button

                    className="reset-button"

                    onClick={resetFilters}

                >

                    Reset

                </button>

            </div>


            {/* MESSAGE */}

            {message && (

                <p className="message-text">

                    {message}

                </p>

            )}


            {/* ERROR */}

            {error && (

                <p className="error-text">

                    {error}

                </p>

            )}


            {/* PRODUCTS */}

            {loading ? (

                <p className="loading-text">

                    Loading products...

                </p>

            ) : (

                <>

                    <p className="product-count">

                        Showing {filteredProducts.length} products

                    </p>


                    <div className="category-grid">

                        {filteredProducts.length > 0 ? (

                            filteredProducts.map((item) => (

                                <div

                                    className="category-card"

                                    key={`${item.category}-${item.id}`}

                                >

                                    <img

                                        src={item.image}

                                        alt={item.name}

                                    />


                                    <h3>

                                        {item.name}

                                    </h3>


                                    <p>

                                        ₹{item.price}

                                    </p>


                                    <p className="category-label">

                                        {item.category}

                                    </p>


                                    <div className="product-actions">

                                        <button

                                            onClick={() => addToCart(item)}

                                        >

                                            Add to Cart

                                        </button>


                                        <button

                                            onClick={() => addToWishlist(item)}

                                        >

                                            Wishlist

                                        </button>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <p className="no-products">

                                No products found.

                            </p>

                        )}

                    </div>

                </>

            )}

        </div>

    );

}

export default AllCategory;