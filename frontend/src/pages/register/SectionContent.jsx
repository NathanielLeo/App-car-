import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SectionContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile_number: "",
    gender: "Male",
    city: "",
    state: "",
    country: "United States",
    password: "",
    confirmPassword: "",
    pincode: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Validate mobile number
    if (!formData.mobile_number) {
      alert("Mobile number is required");
      return;
    }
    // Construct the user data payload
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNumber: formData.mobile_number, // Check this value
      password: formData.password,
      role: [
        {
          roleId: 102,
          roleName: "USER",
        },
      ],
      address: {
        street: formData.street,
        buildingName: formData.buildingName,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
      },
    };

    // Log the userData to see what's being sent
    console.log("userData:", userData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Registration successful");
      console.log("JWT Token:", response.data["jwt-token"]);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
        alert("Registration failed: " + error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
        <article className="card-body">
          <header className="mb-4">
            <h4 className="card-title">Sign up</h4>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="number"
                className="form-control"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
                required
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label className="custom-control custom-radio custom-control-inline">
                <input
                  className="custom-control-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                />
                <span className="custom-control-label"> Male </span>
              </label>
              <label className="custom-control custom-radio custom-control-inline">
                <input
                  className="custom-control-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                />
                <span className="custom-control-label"> Female </span>
              </label>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Street</label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
<label>buildingName</label>
                <input
                  type="text"
                  className="form-control"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Country</label>
                <select
                  id="inputState"
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="United States">United States</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Russia">Russia</option>
                  <option value="India">India</option>
                  <option value="Afghanistan">Afghanistan</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Create password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Repeat password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>State</label>
                <input
                  className="form-control"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Create pincode</label>
                <input
                  className="form-control"
                  type="text"
                  name="pincode"
                  value={formData.pincode}
onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
            <div className="form-group">
              <label className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  required
                />
                <div className="custom-control-label">
                  I agree with <a href="#">terms and conditions</a>
                </div>
              </label>
            </div>
          </form>
        </article>
      </div>
      <p className="text-center mt-4">
        Have an account? <a href="#">Log In</a>
      </p>
      <br />
      <br />
    </section>
  );
}