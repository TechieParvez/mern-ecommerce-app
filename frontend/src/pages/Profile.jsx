import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-4">My Account</h2>

          <p className="mb-2 cursor-pointer text-blue-600">
            Orders
          </p>

          <p className="mb-2 cursor-pointer text-blue-600">
            Cart
          </p>

          <button
            onClick={logoutHandler}
            className="mt-4 text-red-500"
          >
            Logout
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-3 space-y-6">

          {/* USER INFO */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-3">
              User Info
            </h2>

            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>

          {/* ORDERS */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
              My Orders
            </h2>

            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border p-4 rounded"
                  >
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">
                        Order ID: {order._id}
                      </p>

                      <p
                        className={`text-sm ${
                          order.isPaid
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </p>
                    </div>

                    {order.orderItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name} × {item.qty}
                        </span>
                        <span>
                          ₹{item.price * item.qty}
                        </span>
                      </div>
                    ))}

                    <div className="mt-2 font-bold text-blue-600">
                      Total: ₹{order.totalPrice}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;