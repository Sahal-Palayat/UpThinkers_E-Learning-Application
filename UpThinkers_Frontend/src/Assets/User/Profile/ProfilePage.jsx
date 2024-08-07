import React, { useState } from 'react'
import Navbar from '../../Components/UserComponents/Navbar'
import Footer from '../../Components/UserComponents/Footer'
import { useSelector } from 'react-redux'
import SidebarUser from '../../Components/UserComponents/SidebarUser'
import { uploadImages } from '../../../Services/uploadImages'
import { axiosApiUser } from '../../../Services/axios'
import { ToastContainer, toast } from 'react-toastify';

function ProfilePage() {

    const { user } = useSelector((state) => state.user)

    const [profile, setProfile] = useState(null)
    const [img,setImg]=useState(null)

    const handleChange = async (e) => {
        const file = e.target.files[0];
        setProfile(URL.createObjectURL(file))
        let image = await uploadImages(file)
        setImg(image)
        console.log(image)

       

    }

    const handleSubmit = async () => {
       
            const response = await axiosApiUser.post(`/addimage/${user._id}`, {img}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                toast.success('image added successfully');
                console.log('image added successfully');
               
            } else {
                console.log('Unhandled status code:', response.status);
            }
        
    }
    console.log(user);
    return (


        <div >
            <div className='h-[100px]'>
                <Navbar />
            </div>
            <SidebarUser />
            <ToastContainer position="top-center" autoClose={1500} />

            <div className="lg:w-[70%] lg:ml-64 px-6 " style={{ marginBottom: '30rem' }}>
                <main className="profile-page">
                    <section className="relative h-[500px] block mt-3 ">
                        <div className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')", height: '30rem', width: "70.2rem" }}>
                            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black "></span>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                            style={{ transform: "translateZ(0px)" }}>
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="absolute  bg-blueGray-200  ">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6 w-full">
                                    <div className="flex flex-wrap justify-center ">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img alt="..." src={profile ? profile : user.Image} className="shadow-xl rounded-full h-auto  align-middle border-none -m-16 -ml-2 lg:-ml-2 " />
                                            </div>

                                        </div>

                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">

                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <input
                                            id="image"
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            className=" ml-80 pl-16 pt-3 block text-sm  file:rounded-md file:border-0 file:bg-customGreen  file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                        />
                                        <button onClick={handleSubmit} className='bg-customGreen px-3 py-1 mt-2'>Submit</button>
                                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 pt-6 mb-2">
                                            {user.Name}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-phone-alt mr-2 text-lg text-blueGray-400"></i>
                                            +91 -{user.Mobile}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-10">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                        </div>
                                    </div>
                                    <div className=" mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    An artist of considerable range, Jenna the name taken by
                                                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                                    performs and records all of his own music, giving it a
                                                    warm, intimate feel with a solid groove structure. An
                                                    artist of considerable range.
                                                </p>
                                                <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </main>
            </div>
            <Footer />
        </div>
    )
}

export default ProfilePage
