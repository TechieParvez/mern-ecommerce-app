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
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleRegister}>
                <h2 className="text-xl font-bold mb-4">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-2 mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-green-600 text-white py-2">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;