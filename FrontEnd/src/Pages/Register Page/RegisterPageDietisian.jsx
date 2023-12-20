import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import no from '/icon/no.png'
import view from '/icon/view.png'
import hide from '/icon/hide.png'
import yes from '/icon/yes.png'

import DietisianService from '../../Services/Dietisian/dietisian';
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from 'react';

import handler from './handler';

const RegisterPage = () => {
    const schema = Joi.object({
        email: Joi.string().required().messages({
            "string.empty":"Email tidak boleh kosong"
        }),
        username: Joi.string().required().messages({
            "string.empty":"Username tidak boleh kosong"
        }),
        displayName: Joi.string().required().messages({
            "string.empty":"display name tidak boleh kosong"
        }),
        password: Joi.string().required().messages({
            "string.empty":"password tidak boleh kosong"
        }),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.empty":"Confirm password tidak boleh kosong",
            "any.only": "Confirm password tidak sama"
        }),
        birthdate: Joi.date().required().messages({
            "date.empty" : "birthdate tidak boleh kosong"
        }),
        gender: Joi.string().required().messages({
            "string.empty" : "gender tidak boleh kosong"
        }),
        weight: Joi.number().required().messages({
            "number.empty" : "weight tidak boleh kosong"
        }),
        height: Joi.number().required().messages({
            "number.empty" : "height tidak boleh kosong"
        })
    })

    const {register, handleSubmit, reset, formState: { errors }  } = useForm({
        resolver: joiResolver(schema)
    });
    const bg = "url('img/background-login-register.png')";

    const submit = async data => {
        await handler.register(data);
    }

    const handleTimeout = () => {
        setErrorsTimeout(setTimeout(() => {
          reset();
          setErrorsTimeout(null);
        }, 2000));
    };

    const [see, setSee] = useState("password");
    const [see1, setSee1] = useState("password");
    const [cekDob, setCekDob] = useState(false);
    const [cekGender, setGender] = useState(false);
    const [cekHeight, setHeight] = useState(false);
    const [cekWeight, setWeight] = useState(false);
    const [error, setError] = useState("");

    const resetEmail = () => {
        reset({email : "",})
    }
    const resetUsername = () => {
        reset({username : "",})
    }
    const resetPhoneNumber = () => {
        reset({phoneNumber : "",})
    }
    const resetAddress = () => {
        reset({address : "",})
    }
    const resetName = () => {
        reset({displayName : "",})
    }

    return (
        <>
            <div className="bg-cover bg-center bg-gray-400 h-screen flex flex-col" style={{backgroundImage: bg}}>
                <Navbar/>
                <div className="grid grid-cols-3 gap-6 h-full">
                    <div className='w-full h-full flex flex-col items-start justify-center ps-24 pb-24'>
                        <div className='font-bold text-5xl'>Register to</div>
                        <div className='font-bold text-5xl'>get your nutriens</div>

                        <div className='font-semibold text-2xl mt-24'>if you already have an account</div>
                        <div className='font-semibold text-2xl'>you can <span className='underline text-green-500'><a href="/login">Login here!</a></span></div>
                    </div>
                    <div className='w-full h-full flex justify-center items-end'> 
                        <img src={gambar} alt="" className='w-full'/>
                    </div>
                    <form onSubmit={handleSubmit(submit)} className='mt-16 w-10/12'> 
                        <div className='font-bold text-4xl'>Welcome New User</div>
                        {/* EMAIL */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-10 items-center'>
                            <input type="text" placeholder={`${errors.email ? errors?.email?.message : "Enter Your Email" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.email ? 'placeholder-red-500' : ''}`} {...register("email")}/>
                            <div onClick={()=>{
                                resetEmail()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* Username */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type="text" placeholder={`${errors.username ? errors?.username?.message : "Enter Your Username" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.username ? 'placeholder-red-500' : ''}`} {...register("username")}/>
                            <div onClick={()=>{
                                resetUsername()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>  
                        </div>
                        {/* displayName */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type="text" placeholder={`${errors.displayName ? errors?.displayName?.message : "Enter Your Name" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.displayName ? 'placeholder-red-500' : ''}`} {...register("displayName")}/>
                            <div onClick={()=>{
                                resetName()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* password */}
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
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
                        {/* confirm password */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-5 items-center'>
                            <input type={see1} placeholder={`${errors.confirmPassword ? errors?.confirmPassword?.message : "Enter Your Confirm Password" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.confirmPassword ? 'placeholder-red-500' : ''}`} {...register("confirmPassword")}/>
                            <div onClick={
                                ()=>{
                                    if(see1 == "password"){
                                        setSee1("text");
                                    } else {
                                        setSee1("password");
                                    }
                                }
                            }>
                                {see1 === "password" ? 
                                <img src={hide} alt="" className='mx-3' width="30px"/> : 
                                <img src={view} alt="" className='mx-3' width="30px"/>}
                            </div>
                        </div>
                        {/* weight height */}
                        <div className='flex flex-row justify-between'>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center me-2'>
                                <input type="number" placeholder="weight"  className="w-full h-12 items-center bg-transparent border-none outline-none px-4" {...register("weight")}/>
                            </div>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center ms-2'>
                                <input type="number" placeholder="height"  className="w-full h-12 items-center bg-transparent border-none outline-none px-4" {...register("height")}/>
                            </div>
                        </div>
                        {/* birthdate and gender */}
                        <div className='flex flex-row justify-between'>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center me-2'>
                                <input type="date" placeholder="Birthdate"  className="w-full h-12 items-center bg-transparent border-none outline-none px-4" {...register("birthdate")} onChange={(e)=>{
                                    if(e.target.value != ""){
                                        setCekDob(true)
                                    } else {
                                        setCekDob(false)
                                    }
                                }}/>
                                {cekDob ? (
                                    <div>
                                        <img src={yes} alt="" className='mx-2' width="30px"/>
                                    </div>
                                ) : (
                                    <img src={no} alt="" className='mx-2' width="30px"/>
                                )}
                            </div>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center ms-2'>
                                <select className='w-full max-w-s items-center bg-transparent border-none outline-none me-2 px-4' {...register("gender")} onChange={(e)=>{
                                    setGender(true)
                                }}>
                                    <option value="Gender" disabled hidden>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {cekGender ? (
                                    <div>
                                        <img src={yes} alt="" className='mx-2' width="30px"/>
                                    </div>
                                ) : (
                                    <img src={no} alt="" className='mx-2' width="30px"/>
                                )}
                            </div>
                        </div>
                        <div className='h-32'>
                            <button className='w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600'>
                                Register
                            </button>
                            {error != "" && <span className="flex justify-center" style={{ color:"red" }}>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;  