import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ✅ ADD TO CART
  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (!user) {
        alert("Please login first");
        return;
      }

      await API.post(
        "/cart",
        { productId: product._id, qty },
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

  if (!product)
    return (
      <h2 className="p-6 text-center text-gray-600">
        Loading product...
      </h2>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT: IMAGE */}
        <div className="bg-white p-6 rounded-2xl shadow border flex justify-center items-center">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/500x400"
            }
            alt={product.name}
            className="w-full h-96 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* CENTER: DETAILS */}
        <div className="bg-white p-6 rounded-2xl shadow border flex flex-col">

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mb-3">
            Category: {product.category}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-blue-600">
              ₹{product.price}
            </span>
            <span className="text-gray-400 line-through">
              ₹{product.price + 500}
            </span>
            <span className="text-green-600 text-sm font-medium">
              20% OFF
            </span>
          </div>

          {/* STOCK */}
          <p
            className={`mb-4 font-medium ${
              product.countInStock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.countInStock > 0
              ? "In Stock"
              : "Out of Stock"}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* QTY */}
          {product.countInStock > 0 && (
            <div className="mb-4">
              <label className="mr-3 font-medium">
                Quantity:
              </label>

              <select
                value={qty}
                onChange={(e) =>
                  setQty(Number(e.target.value))
                }
                className="border px-3 py-2 rounded-md"
              >
                {[...Array(product.countInStock).keys()].map(
                  (x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
        </div>

        {/* RIGHT: BUY BOX */}
        <div className="bg-white p-6 rounded-2xl shadow border h-fit">

          <h2 className="text-lg font-semibold mb-3">
            Order Summary
          </h2>

          <p className="text-2xl font-bold text-blue-600 mb-3">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Inclusive of all taxes
          </p>

          <p
            className={`mb-4 font-medium ${
              product.countInStock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.countInStock > 0
              ? "Available"
              : "Out of Stock"}
          </p>

          <button
            onClick={addToCart}
            disabled={product.countInStock === 0}
            className={`w-full py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
              product.countInStock > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;