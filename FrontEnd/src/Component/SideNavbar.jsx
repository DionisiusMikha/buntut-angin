import React from 'react';
import logo from '/img/Logo-lebar 1.png'
import navbar1 from '/icon/navbar1.png'
import navbar2 from '/icon/navbar2.png'
import navbar3 from '/icon/navbar3.png'
import navbar4 from '/icon/navbar4.png'

function SideNavbar({hovered}){
    const bg = "url('/icon/hover.png')";
    console.log(hovered);

    const waktu = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const tanggal =  waktu.getDate();
    const bulan = months[waktu.getMonth()];
    const tahun = waktu.getFullYear();
    const jam = waktu.getHours();
    const menit = waktu.getMinutes();

    console.log(waktu)

    return <>
        <div className='my-10 bg-gray-50 mx-10 rounded-2xl w-1/5 drop-shadow-lg'>
            <div className='mx-10 my-16'>
                <img src={logo} alt="" width="80%" className='m-auto' />
                <div className='h-20 ms-5' style={hovered=="home" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row my-10 px-5 py-2' >
                        <img src={navbar1} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Home</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="recipes" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row px-5 py-2'>
                        <img src={navbar2} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Recipes</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="report" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row px-5 py-2'>
                        <img src={navbar3} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Report</div>
                    </div>
                </div>
                <div className='h-20 ms-5' style={hovered=="community" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}}>
                    <div className='flex flex-row px-5 py-2'>
                        <img src={navbar4} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Community</div>
                    </div>
                </div>
                
                {/* LOGOUT */}
                <div className='flex flex-col justify-center items-center mt-14'>
                    <div className='border-black border rounded-xl w-2/3 h-28 text-lg font-semibold rotate-6 flex flex-col justify-center items-center'>
                        <div>
                            {tanggal} {bulan} {tahun}
                        </div>
                        <div>
                            {jam}:{menit}
                        </div>
                    </div>
                    <div className='bg-rose-300 border-black border rounded-xl w-2/3 py-3 mt-9 text-xl font-semibold -rotate-6 flex flex-col justify-center items-center'>
                        Log Out
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SideNavbar;