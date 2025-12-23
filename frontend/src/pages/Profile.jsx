import { useEffect, useState } from "react";
import API from "../services/api";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        logout();
        navigate("/login");
      });
  }, []);

  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            {/* Profile Header Card */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body text-center py-4">
                <div className="mb-3">
                  <div
                    className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <span className="text-white fs-1 fw-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <h4 className="mb-1">{user.name}</h4>
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>

            {/* Profile Details Card */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Profile Information</h5>

                <div className="mb-3">
                  <label className="text-muted small mb-1">Full Name</label>
                  <p className="mb-0 fw-medium">{user.name}</p>
                </div>

                <hr className="my-3" />

                <div className="mb-3">
                  <label className="text-muted small mb-1">Email Address</label>
                  <p className="mb-0 fw-medium">{user.email}</p>
                </div>

                <hr className="my-3" />

                <div>
                  <label className="text-muted small mb-1">
                    Aadhaar Number
                  </label>
                  <p className="mb-0 fw-medium">{user.aadhaar}</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="d-grid">
              <button
                className="btn btn-danger btn-lg"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
