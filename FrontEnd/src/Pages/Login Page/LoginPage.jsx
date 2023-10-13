import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import email from '/img/Logo-kecil.png'
import iconGoogle from '/icon/google icon.png'
import iconFacebook from '/icon/facebook icon.png'
import iconApple from '/icon/apple icon.png'

const LoginPage = () => {
    const bg = "url('img/background-login-register.png')";

    return (
        <>
            <div className="bg-cover bg-center h-screen" style={{backgroundImage: bg}}>
                <Navbar />
                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
                    <div className='mx-20 mt-48'> {/* kata2 */}
                        <div className='font-bold text-5xl'>Sign In to</div>
                        <div className='font-bold text-5xl'>get your Nutriens</div>

                        <div className='font-semibold text-2xl mt-24'>if you don't have an account</div>
                        <div className='font-semibold text-2xl'>you can <span className='underline text-blue-500'><a href="/register">Register here!</a></span></div>
                    </div>
                    <div className='flex flex-col justify-end h-full'> {/* GAMBAR */}
                        <img src={gambar} alt="" className='w-full'/>
                    </div>
                    <div className='mt-24 w-8/12'> {/* login */}
                        <div className='font-bold text-4xl'>Welcome Back</div>
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-20 items-center'>
                            <img src={email} alt="" className='' width="40px"/>
                            <input type="text" placeholder="Enter Your Email"  className="input input-ghost w-full max-w-xs items-center"/>
                            <img src={email} alt="" className='' width="40px"/>
                        </div>
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-5 items-center'>
                            <img src={email} alt="" className='' width="40px"/>
                            <input type="text" placeholder="Enter Your Password"  className="input input-ghost w-full max-w-xs items-center"/>
                            <img src={email} alt="" className='' width="40px"/>
                        </div>
                        <div className='text-right text-sm text-gray-500 mt-2'>
                            Recover Password?
                        </div>
                        <div className='text-center bg-blue-600 rounded-2xl my-16 py-3 text-white'>
                            Sign Up  
                        </div>
                        <div className='flex flex-row justify-center items-center'>
                            <div className='w-1/3'>
                                <hr className='border-gray-300 border' />
                            </div>
                            <div className='w-1/3 text-center text-gray-500'>Or continue with</div>
                            <div className='w-1/3'>
                                <hr className='border-gray-300 border' />
                            </div>
                        </div>
                        <div className='my-10 flex justify-between items-center'>
                            <div className='w-1/4 py-3 rounded-lg bg-white items-center shadow-xl place-content-center'>
                                <img src={iconGoogle} alt="" width="30px" className='mx-auto'/>
                            </div>
                            <div className='w-1/4 py-3 rounded-lg bg-white shadow-xl'>
                                <img src={iconApple} alt="" width="30px" className='mx-auto'/>
                            </div>
                            <div className='w-1/4 py-3 rounded-lg bg-white shadow-xl'>
                                <img src={iconFacebook} alt="" width="30px" className='mx-auto'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;  