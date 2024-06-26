import React, { useState, useEffect, useContext } from 'react'
import logo from '/logoo.png'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import Otp from '../../Components/UserComponents/Otp';
import { config } from '../../../config';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { axiosApiUser } from '../../../Services/axios';
import { jwtDecode } from "jwt-decode";
import { setUser, userRegister } from '../../../Store/userAuthSlice';
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext';





const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const { setToken } = useContext(AuthContext)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        next: false,
        name: '',
        mobile: '',
        email: '',
        password: '',
        image: '',
    });

    const [showOTP, setShowOTP] = useState(false);

    const signupData = { email, name, mobile, password }

    const handleInputChange = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'email':
                setEmail(value);
                setEmailError('');
                break;
            case 'name':
                setName(value);
                setNameError('');
                break;
            case 'mobile':
                setUsername(value);
                setMobileError('');
                break;
            case 'password':
                setPassword(value);
                setPasswordError('');
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                setConfirmPasswordError('');
                break;
            case 'image':
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;


        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email.trim())) {
            setEmailError('Email must be in the format example@gmail.com');
            hasError = true;
        } else {
            setEmailError('');
        }


        if (!name.trim()) {
            setNameError('Name is required');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!mobile.trim()) {
            setMobileError('Mobile is required');
            hasError = true;
        } else if (!/^\d{10}$/.test(mobile.trim())) {
            setMobileError('Mobile number must be exactly 10 digits');
            hasError = true;
        } else {
            setMobileError('');
        }


        if (!password.trim()) {
            setPasswordError('Password is required');
            hasError = true;
        } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(password.trim())) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
            hasError = true;
        } else if (confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError('Passwords do not match');
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }


        if (!hasError) {
            try {
                console.log('vannnnn', signupData);
                const response = await fetch(`${config.USER_BASE_URL}/sendMail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupData)
                })

                if (response.status === 200) {
                    console.log('email sent sucsess');
                    toast.success('Email sent sucsess')
                    setShowOTP(true)

                } else if (response.status === 400) {
                    console.log('user already exist');
                    toast.error('User already exist')
                } else if (response.status === 500) {
                    console.log('failed to send otp');
                } else {
                    console.log('Unhandled status code:', response.status);
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
            handleGoogleLoginSuccess(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse?.credential);
            console.log(decoded, 'llllllllllllllllll');
            const res = await axios.post(`${config.USER_BASE_URL}/googlauth`, {
                email: decoded.email,
                name: decoded.name,
                sub: decoded.sub

            });
            console.log(res.data, 'aaaaaaaaaaaaaaaaaaa')

            if (res.status === 200) {

                dispatch(setUser(res.data.user))
                Cookies.set('token', res.data.token);
                Cookies.set('refreshToken', res.data.refreshToken)
                toast.success('success', {
                    onClose: () => {
                        setToken(res.data.token)
                        navigate("/home")
                    }
                })
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            }
        }
    }

    if (showOTP) {
        return (
            <>

                <ToastContainer position="top-center" autoClose={1500} />
                <Otp signupData={signupData} />

            </>
        )
    }


    return (
        <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="w-full bg-white shadow sm:rounded-lg flex h-screen justify-center flex-1">

                <div className="flex-1 text-center hidden lg:flex bg-contain  bg-center bg-no-repeat " style={{ backgroundImage: "url('https://st.depositphotos.com/1015530/4696/i/450/depositphotos_46963461-stock-photo-little-boy-is-reading-a.jpg')" }}>


                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-2 sm:p-12 ">
                    <div>
                        <img src={logo} className="w-mx-auto" alt="Logo" style={{ width: '30%' }} />
                    </div>
                    <div className="mt-4 flex flex-col items-start">
                        <div className="w-full flex-1 justify-start items-start mt-2">
                            <div className="flex flex-col items-start">
                                <div className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <GoogleLogin
                                        buttonText="Login with Google"
                                        onSuccess={handleGoogleLoginSuccess}
                                        onFailure={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
                                </div>
                            </div>

                            {/* <div className="my-12  text-start">
                            </div> */}
                            <div className="justify-start max-w-xs">
                                <form onSubmit={handleSubmit}>

                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="name"
                                        name="name"
                                        placeholder="Full Name"
                                        type="text"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                    {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                                    <input
                                        autoFocus
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        type="text"
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                    {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Mobile"
                                        type="text"
                                        value={mobile}
                                        onChange={handleInputChange}
                                    />
                                    {mobileError && <p className="text-xs text-red-500">{mobileError}</p>}
                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={handleInputChange}
                                    />
                                    {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    {confirmPasswordError && <p className="text-xs text-red-500">{confirmPasswordError}</p>}
                                    <button
                                        type='submit' className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-">
                                            Sign Up
                                        </span>
                                    </button>
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    You have a Account click here--
                                    <a href="" className="text-blue-500 text-sm font-semibold">
                                        <button onClick={() => navigate('/login')}>Log In</button>
                                    </a>


                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RegisterPage
