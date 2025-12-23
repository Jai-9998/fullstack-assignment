import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    aadhaar: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            <div className="text-center mb-4">
              <div
                className="bg-success bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
              </div>
              <h3 className="mb-1">Create Account</h3>
              <p className="text-muted">Sign up to get started</p>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label text-muted small"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="form-control form-control-lg"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label text-muted small"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="form-control form-control-lg"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      value={form.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label text-muted small"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-control form-control-lg"
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      onChange={handleChange}
                      value={form.password}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="aadhaar"
                      className="form-label text-muted small"
                    >
                      Aadhaar Number
                    </label>
                    <input
                      id="aadhaar"
                      className="form-control form-control-lg"
                      name="aadhaar"
                      type="text"
                      placeholder="Enter your Aadhaar number"
                      onChange={handleChange}
                      value={form.aadhaar}
                    />
                  </div>

                  <div className="d-grid">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-success btn-lg"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <p className="text-muted small mb-0">
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
