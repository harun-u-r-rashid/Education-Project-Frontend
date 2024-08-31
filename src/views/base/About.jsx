import React from 'react';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import aboutImage from '../../assets/base/about.jpg'

function About() {
        return (
        <>

        <BaseHeader></BaseHeader>



        <section className='lastSection'>
            <div className="container-xxl py-2">
                <div className="container mt-3">
                    <div className="row g-3">
                        <div className="col-lg-6" data-wow-delay="0.1s">
                            <div id='aboutImage' className="position-relative h-100">
                                <img className="img-fluid position-absolute w-100 h-100" src={aboutImage} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4" data-wow-delay="0.3s">
                        <h6 className="section-title bg-white text-info text-uppercase pe-3 d-flex align-items-center animated">About Us<span className="flex-grow-1 ms-3 border-bottom border-info"></span></h6>

                            <h1 className="mb-4">Welcome to e-ACADEMY</h1>
                            <p className="mb-4">Academy boasts an extensive library of courses across various disciplines, including technology, business, arts, science, personal development, and more. Whether you're looking to develop new skills, advance in your career, or explore a new hobby, Academy has a course for you.</p>
                            <p className="mb-4">Courses on Academy are taught by industry experts and experienced educators who bring real-world knowledge and practical insights into the virtual classroom. This ensures that learners gain not just theoretical knowledge but also practical skills that can be applied immediately.</p>
                            <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-success me-2"></i>Skilled Instructors</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-success me-2"></i>Online Classes</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-success me-2"></i>International Certificate</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-success me-2"></i>Skilled Instructors</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-success me-2"></i>Online Classes</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-success me-2"></i>International Certificate</p>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <BaseFooter></BaseFooter>
       
        </>
        );
}

export default About;