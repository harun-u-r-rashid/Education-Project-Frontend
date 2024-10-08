import { useState, useEffect } from "react";

import apiInstance from "../../utils/axios";
import { login } from "../../utils/auth";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../plugin/Toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await login(email, password);
    if (error) {
      setIsLoading(false);
      Toast().fire({
        icon: "error",
        title: error,
      });
    } else {
      Toast().fire({
        icon: "success",
        title: "Login successful.",
      });
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section
        className="lastSection container d-flex flex-column vh-60"
      >
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold h1">Sign in</h1>
                  <span className="text-dark">
                    Don’t have an account?
                    <Link  to="/register/" className="text-dark ms-1">
                      Sign up
                    </Link>
                  </span>
                </div>

                
         
                <form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit}
                >
           
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
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
                
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
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
               
                  <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  
                    <div className="d-flex justify-content-center align-items-center">
                      <Link className="text-dark text-decoration-none " to="/forgot-password/">Forgot your password?</Link>
                    </div>
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
                          Sign in <i className="fas fa-sign-in-alt"></i>
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
  );
}

export default Login;
