import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Track fields that have been touched
  const [touched, setTouched] = useState({});

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  useEffect(() => {
    validateForm();
  }, [values]);

  const validateForm = () => {
    let newErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(values.firstName)) {
      newErrors.firstName = "Only letters allowed";
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(values.lastName)) {
      newErrors.lastName = "Only letters allowed";
    }

    if (!/^[0-9]{10}$/.test(values.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit number";
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:8081/cleancity/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setErrors({ form: "Registration failed. Please try again." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ form: "Something went wrong. Try again later." });
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Citizen Registration</h2>
        <p className="subtitle">Join CleanCity to make your city cleaner 🌿</p>

        <form className="register-form" onSubmit={handleSubmission}>
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstName && errors.firstName && (
              <p className="error">{errors.firstName}</p>
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastName && errors.lastName && (
              <p className="error">{errors.lastName}</p>
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Mobile Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>

          {errors.form && <p className="error form-error">{errors.form}</p>}

          <button type="submit" disabled={!isValid}>
            Register
          </button>

          <p className="login-link" onClick={() => navigate("/login")}>
            Already registered? <span>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
