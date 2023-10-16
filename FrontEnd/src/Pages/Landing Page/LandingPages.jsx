import React from 'react';
import Navbar from '../../Component/NavbarLandingPage'
import gambar from '/img/gbr-landingPage.png'
import hati from "/icon/hati.png"
import fitur1 from "/icon/fitur1.png"
import fitur2 from "/icon/fitur2.png"
import fitur3 from "/icon/fitur3.png"
import Card from '../../Component/Card'
import makanan from '/img/makanan.png'
import logo from '/img/Logo-kecil.png'

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
                        <div className='text-blue-500'>One Step Solution</div>
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
                    <div className='text-blue-500 font-bold text-4xl tracking-widest'>FEATURES WE PROVIDE</div>
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

            {/* CARD */}
            <div className='mx-16 py-10'>
                <div className='text-blue-500 font-bold text-4xl tracking-widest'>HELP TOPICS</div>
                <div className='text-6xl font-bold py-5'>Enhance Your Lifestyle</div>
                <div className='flex flex-row'>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                </div>
                <div className='flex flex-row mt-10'>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                    <Card img={makanan} title="Product Name" text="Lorem ipsum dolor sit amet."/>
                </div>
            </div>
            {/* FOOTER */}
            <div className='bg-white rounded-t-2xl px-16 py-10'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='w-1/6'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='text-xl'>
                        <div className='text-blue-500 font-semibold text-2xl'>Products</div>
                        <div className='text-gray-500 pt-5'>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                        </div>
                    </div>
                    <div className='text-xl'>
                        <div className='text-blue-500 font-semibold text-2xl'>Products</div>
                        <div className='text-gray-500 pt-5'>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                        </div>
                    </div>
                    <div className='text-xl'>
                        <div className='text-blue-500 font-semibold text-2xl'>Products</div>
                        <div className='text-gray-500 pt-5'>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                        </div>
                    </div>
                    <div className='text-xl'>
                        <div className='text-blue-500 font-semibold text-2xl'>Contact Us</div>
                        <div className='text-gray-500 pt-5'>
                            <div>Lorem</div>
                            <div>Lorem</div>
                            <div>Lorem</div>
                        </div>
                    </div>
                </div>
                <hr className='mt-10 border'/>
                <div className='flex flex-row justify-between pt-4'>
                    <div>Copyright &copy; 2023</div>
                    <div>All Rights Reserved | <span className='text-blue-500 underline'>Terms and Conditions</span> | <span className='text-blue-500 underline'>Privacy Policy</span></div>
                </div>
            </div>
        </div>
    </>
}

export default LandingPages;