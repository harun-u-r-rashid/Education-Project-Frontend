import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../plugin/Context";
import Logo from '../../assets/logo/online-learning.svg'
function BaseHeader() {
    const [cartCount, setCartCount] = useContext(CartContext);
    // console.log(cartCount);

    return (
        <div className="navContainer">
            {/* Nav er border ta pore delete kore */}
            <nav className="navbar navbar-expand-lg  text-light ">
                <div className="container">
                    <Link className="navbar-brand  text-light fs-4 fw-bold" to="/">
                        <img className="logoImage" src={Logo} alt="" />
                    </Link>
                    <button
                        className="btn navbar-toggler "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        
                        <span className="navbar-toggler-icon fa-solid fa-bars-staggered" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link text-uppercase text-light" to="/">
                                    {" "}
                                    <i class="fa-solid fa-house"></i> Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-uppercase text-light" to="/pages/contact-us/">
                                    {" "}
                                    <i className="fas fa-phone"></i> Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-uppercase text-light" to="/pages/about-us/">
                                    <i className="fas fa-address-card"></i> About
                                </Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-chalkboard-user"></i> Instructor
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/dashboard/`}
                                        >
                                            <i className="bi bi-grid-fill"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/courses/`}>
                                            <i className="fas fa-shopping-cart"></i> My Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/create-course/`}
                                        >
                                            <i className="fas fa-plus"></i> Create Course
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/reviews/`}>
                                            <i className="fas fa-star"></i> Reviews{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/question-answer/`}
                                        >
                                            <i className="fas fa-envelope"></i> Q/A{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/students/`}
                                        >
                                            <i className="fas fa-users"></i> Students{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/earning/`}>
                                            <i className="fas fa-dollar-sign"></i> Earning{" "}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/profile/`}>
                                            <i className="fas fa-gear"></i> Settings & Profile{" "}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-graduation-cap"></i> Student
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/student/dashboard/`}>
                                            {" "}
                                            <i className="bi bi-grid-fill"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/student/courses/`}>
                                            {" "}
                                            <i className="fas fa-shopping-cart"></i>My Courses
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={`/student/wishlist/`}>
                                            {" "}
                                            <i className="fas fa-heart"></i> Wishlist{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/student/question-answer/`}
                                        >
                                            {" "}
                                            <i className="fas fa-envelope"></i> Q/A{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/student/profile/`}>
                                            {" "}
                                            <i className="fas fa-gear"></i> Profile & Settings
                                        </Link>
                                    </li>
                                </ul>
                            </li> */}
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input
                                className="form-control me-2 w-100"
                                type="search"
                                placeholder="Search Courses"
                                aria-label="Search Courses"
                            />
                            <button className="btn btn-outline-success w-30 text-light" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form> */}
                        <Link to="/login/" className="btn btn-primary ms-2 text-uppercase text-light" type="submit">
                            Login <i className="fas fa-sign-in-alt"></i>
                        </Link>
                        <Link to="/register/" className="btn btn-primary ms-2 text-uppercase text-light" type="submit">
                            Register <i className="fas fa-user-plus"> </i>
                        </Link>
                        <Link to="/logout/" className="btn btn-primary ms-2 text-uppercase text-light" type="submit">
                            Logout <i className="fas fa-user-plus"> </i>
                        </Link>

                        <Link className="btn btn-yellow ms-2 text-uppercase" to="/cart/">
                            Cart ({cartCount}) <i className="fas fa-shopping-cart"> </i>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BaseHeader;
