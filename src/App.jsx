import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import apiInstance from "./utils/axios";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";
import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import Search from "./views/base/Search";
import About from "./views/base/About";

import { CartContext } from "./views/plugin/Context";


// =====Internal css====

import './App.css';
import '../src/style/hero.css';
import '../src/style/about.css';
import '../src/style/footer.css';


import CartId from "./views/plugin/CartId";


function App() {

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    apiInstance.get(`course/cart/${CartId()}/`).then((res) => {
      setCartCount(res.data?.length);
      // console.log(res.data.length);
    });
  }, []);

  return (
    <>
      <CartContext.Provider value={[cartCount, setCartCount]}>

        <BrowserRouter>
          <Routes>
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/logout/" element={<Logout />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route path="/new_password/" element={<CreateNewPassword />} />
            <Route path="/" element={<Index />} />
            <Route path="/course-detail/:slug/" element={<CourseDetail />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/checkout/:order_id/" element={<Checkout />} />
            <Route
              path="/payment-success/:order_id/"
              element={<Success />}
            />
            <Route
              path="/search/"
              element={<Search />}
            />

            <Route
              path="/about/"
              element={<About />}
            />


          </Routes>
        </BrowserRouter>
      </CartContext.Provider>

    </>
  )
}

export default App


