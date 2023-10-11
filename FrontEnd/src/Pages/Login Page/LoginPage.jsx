import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

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
                    <div className='mt-24'> {/* login */}
                        <div className='font-bold text-4xl'>Welcome Back</div>
                        <div>
                            {/* <input type="email" name="" id="" value="" placeholder='Email' /> */}
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                {/* <PhoneIcon color='gray.300' /> */}
                                </InputLeftElement>
                                <Input type='tel' placeholder='Phone number' />
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;  