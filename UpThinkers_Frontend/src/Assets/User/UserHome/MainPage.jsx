import React, { useEffect } from 'react'
import logo from '/logoo.png'
import Navbar from '../../Components/UserComponents/Navbar'
import { useDispatch, useSelector } from 'react-redux'

import { axiosApiUser } from '../../../Services/axios';
import AboutUser from '../AboutPage/AboutUser';
import Footer from '../../Components/UserComponents/Footer';
import CourseCard from '../Courses/CourseCard';
import CategoryCard from '../Category/CategoryCard';
import { useNavigate } from 'react-router-dom';







function MainPage() {


    const navigate= useNavigate()
    

    // useEffect(() => {
    //     axiosApiUser.get('/home')
    // }, [])


    return (
        <div>
            <Navbar />
            <section style={{ backgroundImage: 'url(https://rare-gallery.com/uploads/posts/812614-Boys-Little-girls-Three-3-Sofa-Smile.jpg)' }} className="hero bg-cover bg-fixed bg-center h-[35rem] pt-20 mt-2 text-white relative">

                <div className="container mx-auto px-4 ">
                    <div className="row flex flex-col items-start ">
                        <div subtitle="WELCOME TO Easy Education Himatnagar" title="Best Online Education" />
                        <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }} className="p-6 rounded-lg">
                            <h1 className="text-5xl font-bold text-customBlue mb-4">Best Online Education</h1>
                            <h1 className="text-2xl font-bold text-black">WELCOME TO UpThinkers LearningHub</h1>

                            <p className="mt-4 pt-14">
                                Welcome to Easy Education Himatnagar. Education is going to start soon. <br />
                                An online test of 20 marks will be conducted daily and a class test will be conducted on Sunday. <br />
                                15000+15000 will be eligible for government assistance for class 11, 12 Science Arts, Commerce.
                            </p>

                            <div className="button mt-8 flex space-x-4">
                                <button onClick={()=>navigate('/login')} className="primary-btn bg-customGreen text-white py-2 px-4 rounded hover:bg-customBlue">
                                    Login <i className="fa fa-long-arrow-alt-right"></i>
                                </button>
                                <button onClick={()=>navigate('/register')} className="bg-white text-customBlue py-2 px-4 rounded border border-customGreen hover:bg-gray-100">
                                    Signup <i className="fa fa-long-arrow-alt-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <AboutUser />
            <CategoryCard />
            <CourseCard />
            <Footer />


        </div>
    )


}

export default MainPage
