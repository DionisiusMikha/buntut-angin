import React from 'react';
import gambar from '/img/gbr-login-register.png'
import { useForm } from 'react-hook-form'
import { useState } from 'react';

const ResetPassword = () => {
    
    const {register, reset, formState: { errors }  } = useForm({});

    const bg = "url('img/background-login-register.png')";
    
    const [error, setError] = useState("");

    const resetText = () => {
        reset({
            username: "",
        })
    }

    return (
        <>
            <div className="bg-cover bg-center h-screen bg-gray-50">
                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
                    <div className='flex flex-col justify-end h-full mt-32'>
                        <img src={gambar} alt="" className='w-full opacity-0'/>
                    </div>

                    <form className='bg-white ml-16 p-10 mt-60 shadow-xl mx-auto w-full max-w-lg rounded-2xl'>
                        <div className='font-bold text-4xl'>Enter New Password</div>
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-20 items-center'>
                            <input type="text" placeholder={`${errors.username ? errors?.username?.message : "Enter Your Password" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.username ? 'placeholder-red-500' : ''}`} {...register("username")}/>
                            <div onClick={()=>{
                                resetText()
                            }}>
                            </div>
                        </div>
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-10 items-center'>
                            <input type="text" placeholder={`${errors.username ? errors?.username?.message : "Enter Your Password" }`}  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${errors.username ? 'placeholder-red-500' : ''}`} {...register("username")}/>
                            <div onClick={()=>{
                                resetText()
                            }}>
                            </div>
                        </div>
                        <div className='h-32'>
                            <button className='w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600'>
                                <a href="/recovered">
                                Reset Password
                                </a>
                            </button>
                            {error != "" && <span className="flex justify-center" style={{ color:"red" }}>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;  