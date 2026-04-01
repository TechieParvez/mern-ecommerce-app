import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, []);

  // ❌ REMOVE ITEM
  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // 💰 TOTAL
  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.qty * (item.product?.price || 0),
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Shopping Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow text-center border">
            <h2 className="text-xl font-semibold mb-4">
              Your cart is empty
            </h2>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT: ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product?._id}
                  className="bg-white p-4 rounded-2xl shadow border flex gap-4 items-center hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item.product?.image ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.product?.name}
                    className="w-24 h-24 object-contain rounded-lg border"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">
                      {item.product?.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Delivered in 3-5 days
                    </p>

                    <p className="text-blue-600 font-bold mt-1">
                      ₹{item.product?.price}
                    </p>

                    <p className="text-sm mt-1 text-gray-600">
                      Qty: {item.qty}
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeItem(item.product?._id)
                    }
                    className="text-red-500 text-sm font-medium hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="bg-white p-6 rounded-2xl shadow border h-fit">

              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Price Details
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Items ({cartItems.length})</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total Amount</span>
                <span className="text-blue-600">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;