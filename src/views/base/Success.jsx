import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import apiInstance from "../../utils/axios";

function Success() {
  const [order, setOrder] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");

  const param = useParams();
  const urlParam = new URLSearchParams(window.location.search);
  const sessionId = urlParam.get("session_id");
  const paypalOrderId = urlParam.get("paypal_order_id");

  console.log(sessionId);
  console.log(paypalOrderId);
  console.log(param);

  useEffect(() => {
    const formdata = new FormData();

    formdata.append("order_id", param.order_id);
    formdata.append("session_id", sessionId);
    formdata.append("paypal_order_id", paypalOrderId);

    setOrderMessage("Processing Payment");

    try {
      apiInstance.post(`payment/success/`, formdata).then((res) => {
        console.log(res.data);
        setOrderMessage(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(orderMessage);

  return (
    <>
      <BaseHeader />

      <section className="lastSection pt-0  position-relative overflow-hidden my-auto">
        <div className="container position-relative">
          <div className="row align-items-center justify-content-center mt-5">
            {/* Payment Successfull */}
            {orderMessage === "Payment Successfull" && (
              <>
                <div className="d-flex flex-column text-center col-lg-5">
                  <h1 className="text-success">Enrollment Successful!</h1>
                  {/* <p>
                    {" "}
                    
                  </p>
                  <button
                    type="button"
                    className="btn  btn-primary mb-0 rounded-2 w-100"
                  >
                    View your <a href="">My Courses</a> <i className="fas fa-arrow-right"></i>
                  </button> */}
                </div>
         
              </>
            )}

            {/* Already Paid */}
            {orderMessage === "Already Paid" && (
              <>
              <div className="d-flex flex-column col-lg-5">
                  <h1 className="text-success">Already Paid</h1>
                  {/* <p>
                    {" "}
               View your <a href="">My Courses</a>
                  </p>
                  <button
                    type="button"
                    className="successBtn btn btn-primary mb-0 rounded-2 w-100"
                  >
                    View Enrolled Courses <i className="fas fa-arrow-right"></i>
                  </button> */}
                </div>
\
              </>
            )}

            {/* Processing */}
            {orderMessage === "Processing Payment" && (
              <>
                <div className="d-flex flex-column col-lg-5">
                  <h1 className="text-warning">
                    Processing Payment{" "}
                    <i className="fas fa-spinner fa-spin"></i>
                  </h1>
                  <p>
                    {" "}
                    Hey there, please don't leave the page untill your payment is completed.
                  </p>
                </div>
         \
              </>
            )}

            {/* Failed */}
            {orderMessage === "Payment Failed" && (
              <>
               <div className="d-flex flex-column col-lg-5">
                  <h1 className="text-danger">Payment Failed 😔</h1>
                  {/* <p>
                   Payment failed, try again
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger mb-0 rounded-2"
                  >
                    Try again <i className="fas fa-repeat"></i>
                  </button> */}
                </div>
\
              </>
            )}
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Success;
