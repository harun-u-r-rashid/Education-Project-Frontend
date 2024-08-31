import { useState, useEffect } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Toast from "../plugin/Toast";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiInstance.get(`user/password_reset_email/${email}/`).then((res) => {
        // console.log(res.data);
        setIsLoading(false);
        Toast().fire({
          icon: 'success',
          title: "Check your email to reset your password"
        })

      });
    } catch (error) {
      Toast().fire({
        icon: 'error',
        title: "Account with given email not found"
      })
      setIsLoading(false);
    }
  };


  return (
    <>
      <BaseHeader />

      <section className="lastSection container d-flex flex-column vh-60">
        <div className="row align-items-center justify-content-center g-0 h-lg-100">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 h1 fw-bold">Forgot Password</h1>
                  <span>
                    Let's help you get back into your account
                  </span>
                </div>
                <form onSubmit={handleEmailSubmit} className="needs-validation" noValidate="">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
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

                  <div>
                    <div className="d-grid">
                      {isLoading === true && (
                        <button disabled type="submit" className="btn btn-success">
                          Processing <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}

                      {isLoading === false && (
                        <button type="submit" className="btn btn-success">
                          Reset Password <i className="fas fa-arrow-right"></i>
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

export default ForgotPassword