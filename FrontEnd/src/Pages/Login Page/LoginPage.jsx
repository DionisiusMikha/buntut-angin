import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import no from '/icon/no.png'
import view from '/icon/view.png'
import hide from '/icon/hide.png'
import iconGoogle from '/icon/google icon.png'
import iconFacebook from '/icon/facebook icon.png'
import iconApple from '/icon/apple icon.png'
import { Alert } from '@mui/material';

import DietisianService from '../../Services/Dietisian/dietisian';
import DoctorService from '../../Services/konsultan/doctor';

import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getDietisian, getDoctor } from '../../Redux/loginSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        if (data.username == "lifelose" && data.password == "2024dionkurus"){
            navigate("/admin/home")
        } else {
            const res = await DietisianService.loginUser(data.username, data.password);
            // console.log(res.status)
            if(res.status == 200){
                try {
                    navigate("/dietisian/home");
                    dispatch(getDietisian(res.data.token))
                    localStorage.setItem("token", res.data.token)
                } catch (error) {
                    console.log(error)   
                }
            }
            else if(res.status == 400){
                alert(res.data.message + " locating to verify email")
                navigate("/verifyemail");
            }
            else if (res.status == 401){
                alert (res.data.message)
            }
            else {
                if (res.status == 404){
                    const res2 = await DoctorService.loginUser(data.username, data.password);
                    if (res2.status == 200){
                        try {
                            dispatch(getDoctor(res2.data.token))
                            localStorage.setItem("tokenDoctor", res2.data.token);
                            navigate("/konsultan/home");
                        } catch (error) {
                            console.log(error)   
                        }
                    } else {
                        setError(res2.data.message);
                        reset();
                    }
                }
            }
        }
    }
    
    const resetText = () => {
        reset({
            username: "",
        })
    }

    const [see, setSee] = useState("password");

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
                            <input type="text" placeholder={`${errors.username ? errors?.username?.message : "Enter Your Username" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.username ? 'placeholder-red-500' : ''}`} {...register("username")}/>
                            <div onClick={()=>{
                                resetText()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-5 items-center'>
                            <input type={see} placeholder={`${errors.password ? errors?.password?.message : "Enter Your Password" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.password ? 'placeholder-red-500' : ''}`} {...register("password")}/>
                            <div onClick={
                                ()=>{
                                    if(see == "password"){
                                        setSee("text");
                                    } else {
                                        setSee("password");
                                    }
                                }
                            }>
                                {see === "password" ? 
                                <img src={hide} alt="" className='mx-3' width="30px"/> : 
                                <img src={view} alt="" className='mx-3' width="30px"/>}
                            </div>
                        </div>
                        <div className='text-right text-sm text-gray-500 mt-2'>
                            <a href="/sendemail">Forgot Password?</a>
                        </div>
                        <div className='h-32'>
                            <button className='w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600'>
                                Sign In
                            </button>
                            {error != "" && <span className="flex justify-center" style={{ color:"red" }}>{error}</span>}
                        </div>

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
            {error != "" && <Alert severity="error">{error}</Alert>}
        </>
    );
};

export default LoginPage;  