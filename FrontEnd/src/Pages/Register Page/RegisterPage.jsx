import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import email from '/img/Logo-kecil.png'
import iconGoogle from '/icon/google icon.png'
import iconFacebook from '/icon/facebook icon.png'
import iconApple from '/icon/apple icon.png'
import no from '/icon/no.png'
import view from '/icon/view.png'
import hide from '/icon/hide.png'
import yes from '/icon/yes.png'

import { useForm } from 'react-hook-form'
import DietisianService from '../../Services/Dietisian/dietisian';
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from 'react';

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
        confirmPassword: Joi.string().required().messages({
            "string.empty":"confirm password tidak boleh kosong"
        }),
        address: Joi.string().required().messages({
            "string.empty":"address tidak boleh kosong"
        }),
        phoneNumber: Joi.string().required().messages({
            "string.empty":"phone number tidak boleh kosong"
        }),
        birthdate: Joi.date().required().messages({
            "date.empty" : "birthdate tidak boleh kosong"
        }),
        gender: Joi.string().required().messages({
            "string.empty" : "gender tidak boleh kosong"
        }),
        weight : Joi.number().required().messages({
            "number.empty" : "weight tidak boleh kosong"
        }),
        height : Joi.number().required().messages({
            "number.empty" : "height tidak boleh kosong"
        }),
    })
    const {register, handleSubmit, reset, formState: { errors }  } = useForm({
        resolver: joiResolver(schema)
    });
    const bg = "url('img/background-login-register.png')";
    const submit = async data => {
        console.log(data);
        const res = await DietisianService.registerUser(data);
        console.log(res);
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
            <div className="bg-cover bg-center bg-gray-400" style={{backgroundImage: bg}}>
                <Navbar />
                <div className="grid grid-cols-3 gap-6 ">
                    <div className='mx-20 mt-48'>
                        <div className='font-bold text-5xl'>Register to to</div>
                        <div className='font-bold text-5xl'>get your nutriens</div>

                        <div className='font-semibold text-2xl mt-24'>if you already have an account</div>
                        <div className='font-semibold text-2xl'>you can <span className='underline text-green-500'><a href="/login">Login here!</a></span></div>
                    </div>
                    <div className='flex flex-col justify-end h-full'> 
                        <img src={gambar} alt="" className='w-full'/>
                    </div>
                    <form onSubmit={handleSubmit(submit)} className='mt-3 w-10/12'> 
                        <div className='font-bold text-4xl'>Welcome New User</div>
                        {/* EMAIL */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-10 items-center'>
                            <input type="text" placeholder={`${errors.email ? errors?.email?.message : "Enter Your Email" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none ${errors.email ? 'placeholder-red-500' : ''}`} {...register("email")}/>
                            <div onClick={()=>{
                                resetEmail()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* Username */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type="text" placeholder={`${errors.username ? errors?.username?.message : "Enter Your Username" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none ${errors.username ? 'placeholder-red-500' : ''}`} {...register("username")}/>
                            <div onClick={()=>{
                                resetUsername()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* displayName */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type="text" placeholder={`${errors.displayName ? errors?.displayName?.message : "Enter Your Name" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none ${errors.displayName ? 'placeholder-red-500' : ''}`} {...register("displayName")}/>
                            <div onClick={()=>{
                                resetName()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* phoneNumber */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type="text" placeholder={`${errors.phoneNumber ? errors?.phoneNumber?.message : "Enter Your Phone Number" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none ${errors.phoneNumber ? 'placeholder-red-500' : ''}`} {...register("phoneNumber")}/>
                            <div onClick={()=>{
                                resetPhoneNumber()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* password */}
                        <div className='flex flex-row  bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type={see} placeholder={`${errors.password ? errors?.password?.message : "Enter Your Password" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none ${errors.password ? 'placeholder-red-500' : ''}`} {...register("password")}/>
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
                            <input type={see1} placeholder={`${errors.confirmPassword ? errors?.confirmPassword?.message : "Enter Your Confirm Password" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none py-2 px-3 ${errors.confirmPassword ? 'placeholder-red-500' : ''}`} {...register("confirmPassword")}/>
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
                        {/* address */}
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                            <input type="text" placeholder={`${errors.address ? errors?.address?.message : "Enter Your Address" }`}  className={`input w-full max-w-s items-center bg-transparent border-none outline-none ${errors.address ? 'placeholder-red-500' : ''}`} {...register("address")}/>
                            <div onClick={()=>{
                                resetAddress()
                            }}>
                                <img src={no} alt="" className='mx-3' width="30px"/>
                            </div>
                        </div>
                        {/* birthdate and gender */}
                        <div className='flex flex-row justify-between'>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center me-2'>
                                <input type="date" placeholder="Birthdate"  className="input w-full max-w-s items-center bg-transparent border-none outline-none" {...register("birthdate")} onChange={(e)=>{
                                    if(e.target.value != ""){
                                        setCekDob(true)
                                    } else {
                                        setCekDob(false)
                                    }
                                }}/>
                                {cekDob ? <div>
                                    <img src={yes} alt="" className='mx-2' width="30px"/>
                                </div> : <div className='mx-5'></div>}
                            </div>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center ms-2'>
                                <select name="" id="" className='input w-full max-w-s items-center bg-transparent border-none outline-none'  {...register("gender")} onChange={(e)=>{
                                    setGender(true)
                                }}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {cekGender ? <div>
                                    <img src={yes} alt="" className='mx-2' width="30px"/>
                                </div> : <div className='mx-5'></div>}
                            </div>
                        </div>
                        {/* height and weight */}
                        <div className='flex flex-row justify-between'>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center me-2'>
                                <input type="number" placeholder="Height"  className="input w-full max-w-s items-center bg-transparent border-none outline-none" {...register("height")} onChange={(e)=>{
                                    if(e.target.value != ""){
                                        setHeight(true)
                                    } else {
                                        setHeight(false)
                                    }
                                }}/>
                                {cekHeight ? <div>
                                    <img src={yes} alt="" className='mx-2' width="30px"/>
                                </div> : <div className='mx-5'></div>}
                            </div>
                            <div className='w-1/2 flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center ms-2'>
                                <input type="number" placeholder="Weight"  className="input w-full max-w-s items-center bg-transparent border-none outline-none" {...register("weight")} onChange={(e)=>{
                                    if(e.target.value != ""){
                                        setWeight(true)
                                    } else {
                                        setWeight(true)
                                        (false)
                                    }
                                }}/>
                                {cekWeight ? <div>
                                    <img src={yes} alt="" className='mx-2' width="30px"/>
                                </div> : <div className='mx-5'></div>}
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