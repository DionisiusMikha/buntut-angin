import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
import { position } from '@chakra-ui/react';

const LoginPage = () => {
    const bg = "url('img/background-login-register.png')";

    return (
        <>
            <div className="bg-cover bg-center h-screen" style={{backgroundImage: bg}}>
                <Navbar />
                <div className="grid grid-cols-3 gap-6">
                <div className='mx-20 mt-48'> {/* kata2 */}
                    <div className='font-bold text-5xl'>Sign In to</div>
                    <div className='font-bold text-5xl'>get your Nutriens</div>

                    <div className='font-semibold text-2xl mt-24'>if you don't have an account</div>
                    <div className='font-semibold text-2xl'>you can <span className='underline text-blue-500'><a href="/register">Register here!</a></span></div>
                </div>
                <div className='object-none object-bottom'> {/* GAMBAR */}
                    <img src={gambar} alt="" />
                </div>
                <div> {/* login */}

                </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;  