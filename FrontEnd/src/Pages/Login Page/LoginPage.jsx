import React from 'react';
import Navbar from '../../Component/Navbar'
import gambar from '/img/gbr-login-register.png'
// import {RxCrossCircled} from '@react-icons/all-files/rx/RxCrossCircled';
import {RxCrossCircled} from 'react-icons/rx';

const LoginPage = () => {
    const bg = "url('img/background-login-register.png')";
    console.log(RxCrossCircled)

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
                            <input type="email" name="" id="" value="" placeholder='Email' />
                            <img src={RxCrossCircled} alt="icon" id='icon' />
                        </div>
                        {/* import "./styles.css";

                        export default function App() {
                        return (
                            <div className="App">
                            <label htmlFor="copy-button">
                                <input name="copy-button" aria-label="copy-button" value="123456789" />
                                <img
                                id="icon"
                                src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/copy-duplicate-multiply-clone-512.png"
                                alt="icon"
                                />
                            </label>
                            </div>
                        );
                        } */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;  