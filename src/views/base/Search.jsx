import React, { useState, useEffect, useContext } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import apiInstance from "../../utils/axios";


function Search() {

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(CartContext);

  const country = GetCurrentAddress().country;
  const userId = UserData()?.user_id;
  const cartId = CartId();

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

  useEffect(() => {
    fetchCourse();
  }, []);

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


  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   if (query === "") {
  //     fetchCourse();
  //   } else {
  //     const course = courses.filter((course) => {
  //       return course.title.toLowerCase().includes(query);
  //     });
  //     setCourses(course);
  //   }
  // };
  return (
    <>
      <BaseHeader />

      <section className="mb-5">
        <div className="container mb-lg-8 ">
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
                            <Link to={""} className="text-inherit text-decoration-none btn btn-primary">
                              Enroll Now <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                ))

                }
              </div>

              <nav className="d-flex mt-5">
                <ul className="pagination">
                  <li className="">
                    <button className="page-link me-1">
                      <i className="ci-arrow-left me-2" />
                      Previous
                    </button>
                  </li>
                </ul>
                <ul className="pagination">
                  <li key={1} className="active">
                    <button className="page-link">1</button>
                  </li>
                </ul>
                <ul className="pagination">
                  <li className={`totalPages`}>
                    <button className="page-link ms-1">
                      Next
                      <i className="ci-arrow-right ms-3" />
                    </button>
                  </li>
                </ul>
              </nav>
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
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg"
                      alt="dollor"
                    />
                  </div>
             
                  <div className="me-n4 position-absolute top-0 end-0">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg"
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12">
              <div className="text-white p-5 p-lg-0">
      
                <h2 className="h1 text-white">Become an instructor today</h2>
                <p className="mb-0">
                  Instructors from around the world teach millions of students
                  on Geeks. We provide the tools and skills to teach what you
                  love.
                </p>
                <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                  Start Teaching Today <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <BaseFooter />
    </>
  );
}

export default Search;
