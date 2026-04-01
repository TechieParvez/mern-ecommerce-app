import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
          Register
        </button>

        {/* 🔥 LOGIN LINK */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;