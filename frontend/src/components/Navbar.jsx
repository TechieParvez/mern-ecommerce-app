import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef();

  // 🔐 Logout
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // ❌ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex w-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md outline-none"
          />
          <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
            🔍
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">

          {/* CART */}
          <Link
            to="/cart"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            🛒 Cart
          </Link>

          {/* USER */}
          {user ? (
            <div
              ref={dropdownRef}
              className="relative cursor-pointer"
            >
              <div
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
                className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
              >
                👤 {user.name}
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-3 bg-white text-black shadow-xl rounded-xl w-52 overflow-hidden z-50 border">

                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    👤 My Profile
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      🛠 Admin Dashboard
                    </Link>
                  )}

                  <hr />

                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;