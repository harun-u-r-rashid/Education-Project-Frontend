import { useState, useEffect } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import apiInstance from "../../utils/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import Toast from '../plugin/Toast';


function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const otp = searchParam.get("otp");
  const uuidb64 = searchParam.get("uuidb64");
  const refresh_token = searchParam.get("refresh_token");

  const handleCreatePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (confirmPassword !== password) {
      Toast().fire({
        icon: "warning",
        title: "Passwords does not match",
      });
      return;
    } else {
      const formdata = new FormData();
      formdata.append("password", password);
      formdata.append("otp", otp);
      formdata.append("uuidb64", uuidb64);
      formdata.append("refresh_token", refresh_token);

      try {
        await apiInstance
          .post(`user/password_change/`, formdata)
          .then((res) => {
            console.log(res.data);
            setIsLoading(false);
            navigate("/login/");
            Toast().fire({
              icon: "success",
              title: res.data.message,
            });
          });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
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
                  <h1 className="mb-1 fw-bold h1">Create New Password</h1>
                  <span>
                    Choose a new password for your account
                  </span>
                </div>
                <form onSubmit={handleCreatePassword} className="needs-validation" noValidate="">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder=
                      "**************"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>



                  <div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-success">
                        Save New Password <i className='fas fa-check-circle'></i>
                      </button>
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

export default CreateNewPassword