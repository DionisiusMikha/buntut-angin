import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import email from '/img/Logo-kecil.png'
import iconGoogle from '/icon/google icon.png'
import iconFacebook from '/icon/facebook icon.png'
import iconApple from '/icon/apple icon.png'

import DietisianService from '../../Services/Dietisian/Dietisian';

import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from 'react';

const LoginPage = () => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            "string.empty":"username tidak boleh kosong"
        }),
        password: Joi.string().required().messages({
            "string.empty":"password tidak boleh kosong"
        }),
    })
    
    const {register, handleSubmit, reset, formState: { errors }  } = useForm({
        resolver: joiResolver(schema)
    });

    const bg = "url('img/background-login-register.png')";
    
    const [error, setError] = useState("");

    const submit = async data => {
        const res = await DietisianService.loginUser(data.username, data.password);
        console.log(res);
        
        if(res == 200){
            window.location.href = "/dietisian/";
        } else {
            setError(res.data.message);
            reset();
        }
    }

    return (
        <>
            <div className="bg-cover bg-center h-screen" style={{backgroundImage: bg}}>
                <Navbar />
                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
                    <div className='mx-20 mt-48'> {/* kata2 */}
                        <div className='font-bold text-5xl'>Sign In to</div>
                        <div className='font-bold text-5xl'>get your Nutriens</div>

                        <div className='font-semibold text-2xl mt-24'>if you don't have an account</div>
                        <div className='font-semibold text-2xl'>you can <span className='underline text-green-500'><a href="/register">Register here!</a></span></div>
                    </div>
                    <div className='flex flex-col justify-end h-full'> {/* GAMBAR */}
                        <img src={gambar} alt="" className='w-full'/>
                    </div>
                    <form onSubmit={handleSubmit(submit)} className='mt-24 w-10/12'> {/* login */}
                        <div className='font-bold text-4xl'>Welcome Back</div>
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-20 items-center'>
                            <img src={email} alt="" className='' width="40px"/>
                            <input type="text" placeholder="Enter Your Email"  className="input input-ghost w-full max-w-s items-center" {...register("username")}/>
                            <img src={email} alt="" className='' width="40px"/>
                        </div>
                        {errors.username && <span className="" style={{ color:"red" }}>{errors.username.message}</span>}
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-5 items-center'>
                            <img src={email} alt="" className='' width="40px"/>
                            <input type="text" placeholder="Enter Your Password"  className="input input-ghost w-full max-w-s items-center" {...register("password")}/>
                            <img src={email} alt="" className='' width="40px"/>
                        </div>
                        {errors.password && <span className="" style={{ color:"red" }}>{errors.password.message}</span>}
                        <div className='text-right text-sm text-gray-500 mt-2'>
                            Recover Password?
                        </div>
                        <button className='w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600'>
                            Sign In
                        </button>
                        {error != "" && <span className="flex justify-center" style={{ color:"red" }}>{error}</span>}

                        <div className='flex flex-row justify-center items-center mt-16'>
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

export default LoginPage;  