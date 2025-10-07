import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const data = await response.json(); // 👈 await the promise
        const { token, role } = data;      // 👈 destructure object
        localStorage.setItem("token", token);
       // optional if you want to store role
         
        if(role=="ROLE_ADMIN")
        {
           
            navigate("/admin");
        }
        if(role=="ROLE_USER")
        {
            navigate("/home");
        }
        if(role=="ROLE_EMP"){
            navigate("/employee");
        }
        
    } else {
        
        alert("email or password not matched")
    }
} catch (error) {
    console.error("Error:", error);
    alert("Server error. Please try again later.");
}
    };

    return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={!values.email || !values.password}>
                    Login
                </button>
                <p onClick={navigateToRegistration}>Not registered? Click here</p>
            </form>
        </div>
    );
}

export default Login;
