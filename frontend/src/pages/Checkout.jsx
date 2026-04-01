import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/orders",
        {
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Order placed successfully 🎉");
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT: FORM */}
        <form
          onSubmit={placeOrder}
          className="md:col-span-2 bg-white p-8 rounded-2xl shadow border"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Shipping Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Postal Code"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Country"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
            Place Order
          </button>
        </form>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow border h-fit">

          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>Calculated in cart</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>
          </div>

          <hr className="my-4" />

          <p className="text-sm text-gray-500 mb-4">
            You will be able to review your order after placing it.
          </p>

          <button
            onClick={() => navigate("/cart")}
            className="w-full border py-2 rounded-md hover:bg-gray-100 transition"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;