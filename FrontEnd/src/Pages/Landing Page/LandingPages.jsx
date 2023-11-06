import React from 'react';
import Navbar from '../../Component/NavbarLandingPage'
import gambar from '/img/gbr-landingPage.png'
import hati from "/icon/hati.png"
import fitur1 from "/icon/fitur1.png"
import fitur2 from "/icon/fitur2.png"
import fitur3 from "/icon/fitur3.png"
import video from '/video/about-us.mp4'
import buah from '/img/buah.png'
import bgBuah from '/img/bg-buah.png'

function LandingPages() {
    const bg = "url('img/background-landingPages.png')";

    return <>
        <div className="bg-cover min-h-screen" style={{backgroundImage: bg}}>
            <Navbar />
            {/* CAROUSEL */}
            <div className='my-5 flex flex-row items-center justify-between'> 
                <div className='w-8/12 ms-16'>
                    <div className='flex flex-row border rounded-3xl font-semibold text-gray-600 text-xl border-gray-400 bg-white/50 w-1/5 px-5  items-center py-2 '>
                        <div className='pe-2 text-center'>
                            Health Matters 
                        </div>
                        <img src={hati} alt="" width="40px" className='' />
                    </div>
                    <div className='text-6xl font-bold py-8'>
                        <div className='text-green-500'>One Step Solution</div>
                        <div className='pt-3'>for all your dietary</div>
                        <div className='pt-3'>needs.</div>
                    </div>
                    <div className='font-semibold text-gray-400 text-xl'>
                        <div className=''>Using your BMI index we calculate whether the</div>
                        <div className=''>dish is suitable for you</div>
                    </div>
                </div>
                <div className=''>
                    <img src={gambar} alt="" width="500px" className='mx-10' />
                </div>
            </div>
            {/* FITUR */}
            <div className='flex flex-row items-center mx-16 justify-between h-96'>
                <div className=''>
                    <div className='text-green-500 font-bold text-4xl tracking-widest mb-4'>FEATURES WE PROVIDE</div>
                    <div className='text-6xl font-bold py-1'>Calculating BMI</div>
                    <div className='flex flex-row my-3'>
                        <div className='text-6xl font-bold pe-4'>is easier </div>
                        <img src={hati} alt="" className='py-2'/>
                    </div>
                    <div className='font-semibold text-gray-400 text-2xl'>
                        <div>We calculate your BMI index from</div>
                        <div>data like age, height, weight.</div>
                    </div>
                </div>
                <div className='w-8/12'>
                    <table className="table-fixed">
                        <tbody>
                            <tr>
                                <td><img src={fitur1} alt="" /></td>
                                <td><img src={fitur2} alt="" /></td>
                                <td><img src={fitur3} alt="" /></td>
                            </tr>
                            <tr>
                                <td className='font-bold text-2xl'>Food Recomendation</td>
                                <td className='font-bold text-2xl'>Iterative Doctor</td>
                                <td className='font-bold text-2xl'>Nutritional Value</td>
                            </tr>
                            <tr>
                                <td className='text-gray-500 font-semibold text-xl pe-20 tracking-wide'>We provide food recomendation according to your calorie requirements.</td>
                                <td className='text-gray-500 font-semibold text-xl pe-20 tracking-wide'>Solve your queries by interacting with our doctors.</td>
                                <td className='text-gray-500 font-semibold text-xl pe-20 tracking-wide'>Get all the nutritional values of your preferred dish.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ABOUT US */}
            <div className='mx-16 mt-16'>
                <div className='text-4xl font-bold tracking-widest text-green-500'>About Us</div>
                <div className='text-6xl font-bold py-5'>Enhance Your Lifestyle</div>
                <div className='flex flex-row justify-center mt-28'>
                    <div className='bg-orange-100 w-1/2 ps-20 pe-28 pt-14 py-36 mb-28 rounded-3xl' style={{marginTop:"-100px"}}>
                        <div className='text-4xl font-bold'>Make a Helpful Nutrition</div>
                        <div className='text-2xl text-gray-400 py-14'>
                        We often hear that it is necessary for us to be healthy. But how do we become healthy? Due to a balanced diet. Now, what is a balanced diet? Why is it so important? And is it the same for everyone? Let's find out more about it.
                        </div>
                    </div>
                    <div className='w-1/2' style={{marginLeft:"-100px"}}>
                        <div className='w-full h-full'>
                            {/* <iframe src={video} className='rounded-3xl w-full h-full px-1.5'allow="autoplay; fullscreen;" allowFullScreen="1" autoPlay="1" loop></
                            iframe> */}
                            
                            <video controls className='rounded-3xl w-full h-full px-1.5' autoPlay="1">
                                <source src={video}/>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            {/* our history */}
            <div className='flex flex-row pt-10 pb-5 justify-evenly items-center'>
                <div className='w-1/4'><img src={buah} alt="" /></div>
                <div className='w-1/3 pe-12'>
                    <div className='text-5xl text-green-600 font-semibold'><span className='underline underline-offset-8 decoration-red-500'>Ou</span>r History</div>
                    <div className='py-8 text-2xl'>Diet is basically an eating pattern, where the method and type of food is regulated. The goal is to maintain overall body health. Apart from that, diet also aims to achieve or maintain a controlled body weight.</div>
                </div>
            </div>

            {/* Specialty */}
            <div className="bg-[url('/img/bg-buah.png')] bg-cover bg-no-repeat bg-center flex items-center py-52 justify-end">
                <div className='w-1/4 bg-white mx-52 text-center py-16 px-10'>
                    <div className='text-rose-700 font-bold text-3xl pb-5'>Specialty & Seasonal</div>
                    <div className='text-xl text-gray-500'>We bring in produce just for you! Whether the items are in-season or uncommon, every week our specialty list changes.</div>
                </div>
            </div>

            {/* Progress */}
            <div className="bg-[url('/img/progress.png')] bg-cover bg-no-repeat bg-center py-96">
                <div className='py-10'></div>
            </div>
            {/* Footer */}
            <div>

            </div>
        </div>
    </>
}

export default LandingPages;