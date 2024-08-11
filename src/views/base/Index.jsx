import React, { useEffect, useState, useContext } from 'react'

import moment from 'moment'
import Rater from "react-rater";
import "react-rater/lib/react-rater.css"
import { Link } from 'react-router-dom'
import useAxios from '../../utils/useAxios'
import apiInstance from '../../utils/axios';

// ===Image import ====
import imageOne from '../../assets/base/image1.png'
import reviewImage from '../../assets/base/reviewImage.jpeg'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { CartContext } from '../plugin/Context';
import Toast from '../plugin/Toast';
import UserData from '../plugin/UserData';
import CartId from '../plugin/CartId';
import GetCurrentAddress from '../plugin/UserCountry';

function Index() {

    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cartCount, setCartCount] = useContext(CartContext);

    const country = GetCurrentAddress().country;
    const userId = UserData()?.user_id;
    const cartId = CartId();

    // Fetching Course
    const fetchCourse = async () => {
        setIsLoading(true);
        try {
            await useAxios()
                .get(`course/course_list/`)
                .then((res) => {
                    setCourses(res.data);
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(courses);

    // Review fetching
    const fetchReview = async () => {
        setIsLoading(true);
        try {
            await useAxios()
                .get(`course/review/`)
                .then((res) => {
                    setReviews(res.data);
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(reviews);


    useEffect(() => {
        fetchCourse();
        fetchReview();
    }, []);



    // Add to cart
    const addToCart = async (courseId, userId, price, country, cartid) => {
        const formdata = new FormData();

        formdata.append("course_id", courseId);
        formdata.append("user_id", userId);
        formdata.append("price", price);
        formdata.append("country", country);
        formdata.append("cart_id", cartId);

        try {
            await useAxios()
                .post(`course/create_cart/`, formdata)
                .then((res) => {
                    console.log(res.data);
                    Toast().fire({
                        title: "Added to cart",
                        icon: "success",
                    });

                    apiInstance.get(`course/cart/${CartId()}/`).then((res) => {
                        setCartCount(res.data?.length);
                    });
                })
        } catch (error) {
            console.log(error);

        }
    };

    const [searchQuery, setSearchQuery] = useState("");
    console.log(searchQuery);


    // handling search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            fetchCourse();

        } else {

            const course = courses.filter((course) => {
                return course.title.toLowerCase().includes(query);
            });
            setCourses(course);

        }
        console.log(query)
    };




    return (
        <>
            <BaseHeader />

            <section className="py-lg-8 py-5">
                {/* container */}
                <div className="container my-lg-8">
                    {/* row */}
                    <div className="row align-items-center">
                        {/* col */}
                        <div className="col-lg-6 mb-6 mb-lg-0">
                            <div>

                                <h1 className="display-5 fw-bold mb-3">
                                    Increase your skills and grow you knowledge.
                                </h1>
                                {/* para */}
                                <p className="pe-lg-10 mb-5">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem incidunt illo, possimus molestias ex facere reiciendis ipsam commodi dolore quaerat!
                                </p>
                                {/* btn */}
                                {/* <a href="#" className="btn btn-primary fs-4 text-light ms-3">
                                    Join Free <i className='fas fa-plus'></i>
                                </a> */}
                                <a target='blank'
                                    href="https://www.youtube.com/"
                                    className="btn btn-outline-success fs-5 d-block mx-auto"
                                >

                                    Watch Demo <i className='fas fa-video'></i>
                                </a>
                            </div>
                        </div>
                        {/* col */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            {/* images */}
                            <div className="position-relative imgContainer">
                                <img
                                    src={imageOne}

                                    className="end-0 bottom-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-8">
                <div className="container mb-lg-8">
                    {/* row */}
                    <div className="row mb-5">
                        <div className="col-md-6 col-lg-3 border-top-md border-top pb-4  border-end-md">
                            {/* text */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-award fs-2 text-info" />
                                </div>
                                <div className="lh-1">
                                    <h2 className="mb-1">10+</h2>
                                    <span>Qualified Instructor</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
                            {/* icon */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-users fs-2 text-warning" />
                                </div>
                                {/* text */}
                                <div className="lh-1">
                                    <h2 className="mb-1">1k+</h2>
                                    <span>Course enrolments</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
                            {/* icon */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-tv fs-2 text-primary" />
                                </div>
                                {/* text */}
                                <div className="lh-1">
                                    <h2 className="mb-1">100+</h2>
                                    <span>Courses in 5 languages</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 border-top-lg border-top">
                            {/* icon */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-film fs-2 text-success" />
                                </div>
                                {/* text */}
                                <div className="lh-1">
                                    <h2 className="mb-1">500+</h2>
                                    <span>Online Videos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mb-5'>
                <div className="container mb-lg-8 ">
                    <div className="row mb-2 mt-3">
                        {/* col */}
                        <div className="col-12">
                            <div className="mb-6">
                                <h2 className="mb-1 h1">👩🏻‍💻Popular Courses</h2>
                                <p>

                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="searchBox row mb-5 mt-1 justify-content-center text-center">
                        {/* col */}
                        <div className="col-12">
                            <div className="mb-1">
                                {searchQuery !== "" && (
                                    <span className="mb-1 d-block">
                                        Showing Results for "{searchQuery}"
                                    </span>
                                )}
                            </div>

                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-8 col-sm-10">
                                <input
                                    type="text"
                                    className="form-control lg mt-1"
                                    placeholder="Search Courses..."
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                {courses?.map((course, index) => (
                                    <div className="col">
                                        {/* Card */}
                                        <div className="card card-hover">
                                            <Link to={`/course-details/${course.slug}/`}>
                                                <img
                                                    src={course.image}
                                                    alt="course"
                                                    className="card-img-top"
                                                    style={{ width: "100%", height: "200px", objectFit: "cover" }}

                                                />
                                            </Link>
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <span className="badge bg-info">{course.level}</span>
                                                    <a href="#" className="fs-5">
                                                        <i className="fas fa-heart text-danger align-middle" />
                                                    </a>
                                                </div>
                                                <h4 className="mb-2 text-truncate-line-2 ">
                                                    <Link
                                                        to={`/course-detail/${course.slug}/`}
                                                        className="text-inherit text-decoration-none text-dark fs-5"
                                                    >
                                                        {course.title}
                                                    </Link>
                                                </h4>
                                                <small>By: {course.teacher.full_name}</small> <br />
                                                <small>
                                                    {course.students?.length} Student
                                                    {course.students?.length > 1 && "s"}
                                                </small> <br />
                                                <div className="lh-1 mt-3 d-flex">
                                                    <span className="align-text-top">
                                                        <span className="fs-6">
                                                            <Rater total={5} rating={course.average_rating || 0} />
                                                        </span>
                                                    </span>
                                                    <span className="text-warning ms-1">4.5</span>

                                                    <span className="fs-6 ms-2 d-block">({course.reviews?.length} Reviews)</span> {/* Added d-block class */}

                                                </div>
                                            </div>
                                            {/* Card Footer */}
                                            <div className="card-footer">
                                                <div className="row align-items-center g-0">
                                                    <div className="col">
                                                        <h5 className="mb-0">${course.price}</h5>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button

                                                            type='button'
                                                            onClick={() =>
                                                                addToCart(
                                                                    course.id,
                                                                    userId,
                                                                    course.price,
                                                                    country,
                                                                    cartId
                                                                )
                                                            }
                                                            className="text-inherit text-decoration-none btn btn-primary me-2">
                                                            <i className="fas fa-shopping-cart text-primary text-white" />
                                                        </button>
                                                        {/* <Link to={""} className="text-inherit text-decoration-none btn btn-primary">
                                                            Enroll Now <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
                                                        </Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            {/* <nav className="d-flex mt-5">
                                <ul className="pagination">
                                    <li
                                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                    >
                                        <button
                                            className="page-link me-1"
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            <i className="ci-arrow-left me-2" />
                                            Previous
                                        </button>
                                    </li>

                                    {pageNumbers.map((number) => (
                                        <li
                                            key={number}
                                            className={`page-item ${currentPage === number ? "active" : ""}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(number)}
                                            >
                                                {number}
                                            </button>
                                        </li>
                                    ))}

                                    <li
                                        className={`page-item ${currentPage === totalPage ? "disabled" : ""}`}
                                    >
                                        <button
                                            className="page-link ms-1"
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Next
                                            <i className="ci-arrow-right ms-3" />
                                        </button>
                                    </li>
                                </ul>
                            </nav> */}


                        </div>
                    </div>
                </div>
            </section>

            <section className="my-8 py-lg-8">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
                        {/* col */}
                        <div className="col-lg-6 col-12 d-none d-lg-block">
                            <div className="d-flex justify-content-center pt-4">
                                {/* img */}
                                <div className="position-relative">
                                    <img
                                        src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                                        alt="image"
                                        className="img-fluid mt-n8"
                                    />
                                    <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg" alt="dollor" />
                                    </div>
                                    {/* img */}
                                    <div className="me-n4 position-absolute top-0 end-0">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg" alt="graph" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="text-white p-5 p-lg-0">
                                {/* text */}
                                <h2 className="h1 text-white">Become an instructor today</h2>
                                <p className="mb-0">
                                    Instructors from around the world, teach millions of students on
                                    Geeks. We provide the tools and skills to teach what you love.
                                </p>
                                {/* <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                                    Start Teaching Today <i className='fas fa-arrow-right'></i>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-200 pt-8 pb-8 mt-5">
                {reviews.length > 0 && (
                    <h1 className='h1 mb-3'> 🌟Students Say</h1>
                )}

                <div className="container pb-8">


                    <div className="row">
                        {/* col */}
                        <div className="col-md-12">
                            <div className="position-relative">
                                {/* controls */}
                                {/* slider */}
                                <div className="sliderTestimonial">
                                    {/* item */}
                                    <div className="row">


                                        {reviews?.map((r, index) => (
                                            <div className="col-lg-4 mb-1">
                                                <div className="item">

                                                    <div className="card">
                                                        <div className="card-body text-center p-6">
                                                            {/* img */}
                                                            <div className='reviewImageContainer'>
                                                                <img
                                                                    src={reviewImage}
                                                                    alt="avatar"
                                                                    className="avatar avatar-lg rounded-circle"
                                                                />
                                                            </div>
                                                            <p className="mb-0 mt-3">
                                                                "{r.review}"
                                                            </p>

                                                            <p className="mb-0 mt-3 h6">
                                                                For `{r?.course?.title}` By `{r.user.full_name}`
                                                            </p>
                                                            <h6 className="mb-0 h6"></h6>
                                                            {/* rating */}
                                                            <div className="lh-1 mb-3 mt-4">
                                                                <span className="fs-6 align-top">


                                                                    {/* <span className="align-text-top">
                                                        <span className="fs-6">
                                                            <Rater total={5} rating={course.average_rating || 0} />
                                                        </span>
                                                    </span>
                                                    <span className="text-warning ms-1">4.5</span>

                                                    <span className="fs-6 ms-2 d-block">({course.reviews?.length} Reviews)</span>  */}

                                                                    <Rater total={5} rating={r?.rating || 0} />
                                                                </span>
                                                                <span className="text-warning">5</span>
                                                                {/* text */}
                                                            </div>

                                                            {/* <span>Software Engineer at Palantir</span> */}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        ))}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />

        </>
    )
}

export default Index
