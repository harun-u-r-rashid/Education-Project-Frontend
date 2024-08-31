import React, { useEffect, useState, useContext } from 'react'

import moment from 'moment'
import Rater from "react-rater";
import "react-rater/lib/react-rater.css"
import { Link, useNavigate } from 'react-router-dom'
import useAxios from '../../utils/useAxios'
import apiInstance from '../../utils/axios';


import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { CartContext } from '../plugin/Context';
import Toast from '../plugin/Toast';
import UserData from '../plugin/UserData';
import CartId from '../plugin/CartId';
import GetCurrentAddress from '../plugin/UserCountry';


// ===Image import ====
import heroImage from '../../assets/base/hero.jpg'
import reviewImage from '../../assets/base/reviewImage.jpeg'


function Index() {

    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cartCount, setCartCount] = useContext(CartContext);

    const country = GetCurrentAddress().country;
    const userId = UserData()?.user_id;
    const isActive = UserData()?.is_active;
    const navigate = useNavigate();

    const userdetails = UserData();


    const cartId = CartId();


    // // Random console

    // if (userdetails) {
    //     console.log(isActive);
    // } else {
    //     console.log("No user details available");
    // }


    const fetchCourse = async () => {
        setIsLoading(true);
        if (isActive || !isActive) {
            try {
                await useAxios()
                    .get(`course/course_list/`)
                    .then((res) => {
                        setCourses(res.data);
                        console.log(res.data);
                        setIsLoading(false);
                    });
            } catch (error) {
                console.log(error);
            }

        }

    };

    // console.log(courses);

    // Review fetching
    const fetchReview = async () => {
        setIsLoading(true);

        if (isActive || !isActive) {
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

        if (isActive) {
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
        } else {
            console.log("Login first");
            Toast().fire({
                title: "You have to login first!",
                icon: "error",

            });
            navigate(`/login/`);
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




    <section className=''>
  <div className="container-fluid p-0">
    <div className="heroContainer">
      <div className="heroItem position-relative">
        <img className="img-fluid" src={heroImage} alt="" />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: "rgba(24, 29, 56, .5)", zIndex: 2 }}>
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-sm-10 col-lg-8">
                <h5 className="text-white text-uppercase mb-3 animated slideInDown">Welcome to academy</h5>
                <h1 className="display-6 text-white animated slideInDown">The Best Online Learning Platform</h1>
                <p className="fs-5 text-white mb-4 pb-2">Online learning is not the next big thing, it is the now big thing.</p>
                <Link to="/about/" className="btn btn-info py-md-3 px-md-5 me-3 animated slideInLeft">
                  About Us <i className="fa-solid fa-address-card"></i>
                </Link>
                <a href="https://www.youtube.com/" target='blank' className="btn btn-light py-md-3 px-md-5 animated slideInRight">
                  Watch Demo <i className="fa-solid fa-video"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



            <section className=''>
                <div class="container-xxl py-1">
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div class="service-item text-center pt-2">
                                    <div class="p-4">
                                        <i class="fa fa-3x fa-graduation-cap mb-4"></i>
                                        <h5 class="mb-3">Skilled Instructors</h5>
                                        <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div class="service-item text-center pt-2">
                                    <div class="p-4">
                                        <i class="fa fa-3x fa-globe  mb-4"></i>
                                        <h5 class="mb-3">Online Classes</h5>
                                        <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div class="service-item text-center pt-2">
                                    <div class="p-4">
                                        <i class="fa fa-3x fa-home  mb-4"></i>
                                        <h5 class="mb-3">Home Projects</h5>
                                        <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div class="service-item text-center pt-2">
                                    <div class="p-4">
                                        <i class="fa fa-3x fa-book-open  mb-4"></i>
                                        <h5 class="mb-3">Book Library</h5>
                                        <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className=''>
                <div className="container">
                    <div className="row">
                  
                        <div className="col-12">
                            <div className="">
                                <h2 className="mb-1 h1">👩🏻‍💻Popular Courses</h2>
                                <p>

                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="searchBox row mb-4 justify-content-center text-center">
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

            {/* <section className="my-8 py-lg-8">
        
                <div className="container">
         
                    <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
           
                        <div className="col-lg-6 col-12 d-none d-lg-block">
                            <div className="d-flex justify-content-center pt-4">
                      
                                <div className="position-relative">
                                    <img
                                        src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                                        alt="image"
                                        className="img-fluid mt-n8"
                                    />
                                    <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg" alt="dollor" />
                                    </div>
                              
                                    <div className="me-n4 position-absolute top-0 end-0">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg" alt="graph" />
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div className="col-lg-5 col-12">
                            <div className="text-white p-5 p-lg-0">
                           
                                <h2 className="h1 text-white">Become an instructor today</h2>
                                <p className="mb-0">
                                    Instructors from around the world, teach millions of students on
                                    Geeks. We provide the tools and skills to teach what you love.
                                </p>
                              <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                                    Start Teaching Today <i className='fas fa-arrow-right'></i>
                                </a> 
                            </div>
                        </div> 
                    </div>
                </div>
            </section> */}

            <section className="lastSection bg-gray-200">
                {reviews.length > 0 && (
                    <h1 className='h1'> 🌟Students Say</h1>
                )}

                <div className="container pb-8 mt-4">


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
