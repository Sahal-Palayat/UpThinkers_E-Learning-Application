import React, { useEffect, useState, lazy, Suspense } from "react";
import TutorSidebar from "../../Components/TutorComponents/TutorSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosApiTutor } from "../../../Services/axios";
import SidebarUser from "../../Components/UserComponents/SidebarUser";
import Navbar from "../../Components/UserComponents/Navbar";

const LessonDetails = lazy(() => import('../../Tutor/Courses/LessonDetails'));

const UserCourseDetails = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [lessons, setLessons] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    // console.log(course);

    const {tutor}=useSelector((state)=>state.tutor)
    console.log(tutor,'tttttttttttttttttuuuuuuuuuuuuuuuuuu');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                console.log('Fetching lessons...');
                const { data } = await axiosApiTutor.get(`/getlessons/${course._id}`);
                setLessons(data.lessons);
                console.log(data.lessons, 'lessons fetched');
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        }
        fetchLessons();
    }, []);

    console.log(lessons, 'lesooosn');
    return (
        <div>
            <Navbar/>
            <SidebarUser />
            <div className=" lg:w-[80] lg:ml-64 py-10">
            <span onClick={() => navigate('/getcertificate', { state: { course: course } })} className="float-right pr-20">
                    <p href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-user"></i>
                        <span>Get Certificate</span>
                    </p>

                </span>
             
                <h1 class="text-4xl font-bold text-gray-800 dark:text-customBlue mb-3 ml-6">Course Details...</h1>
                <div class="bg-gray-100 dark:bg-white py-8">
                    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col md:flex-row -mx-4">
                            <div class="md:flex-1 px-4">
                                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    <img class="w-full h-full object-cover" src={course.Image} alt="Product Image" />
                                </div>
                            </div>
                            <div class="md:flex-1 px-4">
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-black mb-2">{course.Name}</h2>
                                <p class="text-gray-600 dark:text-black text-sm mb-4">
                                    {course.Description}
                                </p>
                               
                                <div class="mb-4">
                                    <span class="font-bold text-gray-700 dark:text-black">Course Duration:</span>
                                    <span class="text-gray-600 dark:text-black">{course.Duration}</span>
                                </div>
                                <div class="mb-4">
                                    <span class="font-bold text-gray-700 dark:text-black">Category:</span>
                                    <span class="text-gray-600 dark:text-black">{course.Category}</span>
                                </div>
                                <div>
                                    <span class="font-bold text-gray-700 dark:text-black">Rating :</span>
                                    <span class="text-gray-600 dark:text-black">{course.Duration}</span>
                                </div>
                                <div>
                                    <span class="font-bold text-gray-700 dark:text-black">Product Description:</span>
                                    <p class="text-gray-600 dark:text-black text-sm mt-2">
                                        This Description dolor sit amet, consectetur adipiscing elit. Sed
                                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                    </p>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>

                <div className="2xl:mx-auto 2xl:container 2xl:px-20 xl:px-12 sm:px-6 px-4 py-16">
                    <h1 className="lg:text-4xl text-3xl font-semibold leading-9 text-gray-800">Lesson Details...</h1>
                    <p className="md:w-1/2 text-base leading-normal mt-4 sm:pr-10 text-gray-600">
                        If you're looking for lesson details, you've scroll page.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {lessons.map((lesson, index) => (
                            <Suspense key={index} fallback={<div>Loading...</div>}>
                                <LessonDetails lesson={lesson} />
                            </Suspense>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCourseDetails;
