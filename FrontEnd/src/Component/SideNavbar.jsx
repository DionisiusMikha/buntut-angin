import React from 'react';
import logo from '/img/Logo-lebar 1.png'
import navbar1 from '/icon/navbar1.png'
import navbar2 from '/icon/navbar2.png'
import navbar3 from '/icon/navbar3.png'
import navbar4 from '/icon/navbar4.png'
import navbar5 from '/icon/navbar5.png'

function SideNavbar({hovered}){
    const bg = "url('/icon/hover.png')";
    console.log(hovered);
    return <>
        <div className='my-10 bg-gray-50 mx-10 rounded-2xl w-1/5 drop-shadow-lg'>
            <div className='mx-10 my-16'>
                <img src={logo} alt="" width="80%" className='m-auto' />
                <div className='h-20 ms-5' style={hovered=="home" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row my-12 px-5 py-2' >
                        <img src={navbar1} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Home</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="recipes" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row my-4 px-5 py-2'>
                        <img src={navbar2} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Recipes</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="report" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row my-4 px-5 py-2'>
                        <img src={navbar3} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Report</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="community" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row my-4 px-5 py-2'>
                        <img src={navbar4} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Community</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="contactUs" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row my-4 px-5 py-2'>
                        <img src={navbar5} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Contact Us</div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SideNavbar;