import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const navigateToRegistration = () => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/cleancity/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const data = await response.json();
                const { token, role } = data;
                localStorage.setItem("token", token);

                if (role === "ROLE_ADMIN") navigate("/admin");
                else if (role === "ROLE_USER") navigate("/home");
                else if (role === "ROLE_EMP") navigate("/employee");
            } else {
                alert("Email or password not matched");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>CleanCity Login</h2>
                <p className="subtitle">Enter your credentials to access your account</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit" disabled={!values.email || !values.password}>
                        Login
                    </button>
                </form>

                <p className="register-link">
                    Not registered? <span onClick={navigateToRegistration}>Create an account</span>
                </p>
            </div>
        </div>
    );
}

export default Login;
