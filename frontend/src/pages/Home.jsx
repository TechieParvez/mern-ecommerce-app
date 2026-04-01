import { useEffect, useState } from "react";
import API from "../services/api";
import CategoryBar from "../components/CategoryBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ADD TO CART FUNCTION
  const addToCart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (!user) {
        alert("Please login first");
        return;
      }

      await API.post(
        "/cart",
        { productId, qty: 1 },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Added to cart ✅");
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div className="bg-gray-100 min-h-screen">

      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mb-6 shadow">
          <h2 className="text-2xl md:text-3xl font-bold">
            Big Sale is Live 🔥
          </h2>
          <p className="mt-2 text-sm md:text-base">
            Up to 50% OFF on Electronics, Fashion & More
          </p>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Explore Products
        </h1>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden group border"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/400x300"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />

                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

                <h2 className="text-md font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>

                {/* PRICE + FAKE DISCOUNT */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price + 500}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id);
                  }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;