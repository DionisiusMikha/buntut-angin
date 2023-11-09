import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import email from '/img/Logo-kecil.png'
import iconGoogle from '/icon/google icon.png'
import iconFacebook from '/icon/facebook icon.png'
import iconApple from '/icon/apple icon.png'

import { useForm } from 'react-hook-form'

const RegisterPage = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const bg = "url('img/background-login-register.png')";

    const submit = data => {
        console.log(data);
    }

    return (
        <>
            <div className="bg-cover bg-center h-screen" style={{backgroundImage: bg}}>
                <Navbar />
                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
                    <div className='mx-20 mt-48'> {/* kata2 */}
                        <div className='font-bold text-5xl'>Register to to</div>
                        <div className='font-bold text-5xl'>get your nutriens</div>

                        <div className='font-semibold text-2xl mt-24'>if you already have an account</div>
                        <div className='font-semibold text-2xl'>you can <span className='underline text-green-500'><a href="/login">Login here!</a></span></div>
                    </div>
                    <div className='flex flex-col justify-end h-full'> {/* GAMBAR */}
                        <img src={gambar} alt="" className='w-full'/>
                    </div>
                    <form onSubmit={handleSubmit(submit)} className='mt-12 w-10/12'> {/* Register */}
                        <div className='font-bold text-4xl'>Welcome New User</div>
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-10 items-center'>
                            <img src={email} alt="" className='' width="40px"/>
                            <input type="text" placeholder="Enter Your Email"  className="input input-ghost w-full max-w-s items-center bg-transparent border-none outline-none" {...register("email")}/>
                            <img src={email} alt="" className='' width="40px"/>
                        </div>
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-5 items-center'>
                            <img src={email} alt="" className='' width="40px"/>
                            <input
                                type="text"
                                placeholder="Enter Your Password"
                                className="input input-ghost w-full max-w-s items-center bg-transparent border-none outline-none"
                                {...register("ps")}
                            />
                            <img src={email} alt="" className='' width="40px"/>
                        </div>
                        <div className='flex flex-row  mt-5 items-center'>
                            <div className='w-1/3 px-2 py-2 bg-gray-200 rounded-xl me-5'>
                                <input type="text" placeholder="Age"  className="input input-ghost items-center w-full" {...register("age")}/>
                            </div>
                            <div className='w-2/3 px-2 py-2 bg-gray-200 rounded-xl '>
                                {/* <input type="text" placeholder="Gender" className="input input-ghost items-center w-full" {...register("gender")}/> */}
                                <select placeholder="Gender" className="input input-ghost items-center w-full bg-transparent border-none outline-none" {...register("gender")}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-row  mt-5 items-center'>
                            <div className='w-1/2 px-2 py-2 bg-gray-200 rounded-xl me-5'>
                                <input type="text" placeholder="Height"  className="input input-ghost items-center w-full" {...register("height")}/>
                            </div>
                            <div className='w-1/2 px-2 py-2 bg-gray-200 rounded-xl '>
                                <input type="text" placeholder="Weight"  className="input input-ghost items-center w-full" {...register("weight")}/>
                            </div>
                        </div>
                        <div className='text-right text-sm text-gray-500 my-4'>
                            Having Problem?
                        </div>
                        <a href="/loading">
                            <button className='w-full text-center bg-green-500 rounded-2xl my-14 py-3 text-white hover:bg-green-600'>
                                Register
                            </button>
                        </a>
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
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;  