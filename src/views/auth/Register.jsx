import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import { register } from "../../utils/auth";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import Toast from "../plugin/Toast";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await register(fullName, email, password, password2);
    if (error) {
      Toast().fire({
        icon:'error',
        title:"Registration failed"
      })
      setIsLoading(false);
    } else {
      navigate("/");
      Toast().fire({
        icon:'success',
        title:"Thanks for your registration! You have been logged in"
      })
      setIsLoading(false);
    }
  };




  return (
    <>
      <BaseHeader />

      <section className="lastSection container d-flex flex-column vh-60">
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold h1">Sign up</h1>
                  <span>
                    Already have an account?
                    <Link to="/login/" className="ms-1 text-dark">
                      Sign In
                    </Link>
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="needs-validation" noValidate="">

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="full_name"
                      className="form-control"
                      name="full_name"
                      placeholder="ex: Harunur Rashid"
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="ex: harun@gmail.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-1">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <span className="span text-danger">Your password should be at least 8 characters long, combining letters, numbers, and special symbols</span>
                  </div>
                  <div>
                    <div className="d-grid">
                      {isLoading === true && (
                        <button
                          disabled
                          type="submit"
                          className="btn btn-success"
                        >
                          Processing <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}

                      {isLoading === false && (
                        <button type="submit" className="btn btn-success">
                          Sign Up <i className="fas fa-user-plus"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default Register