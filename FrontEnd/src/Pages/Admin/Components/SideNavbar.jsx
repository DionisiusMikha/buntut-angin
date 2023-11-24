import React, { useEffect, useState } from 'react';
import logo from '/img/Logo-lebar 1.png'
import navbar1 from '/icon/navbar1.png'
import navbar2 from '/icon/navbar2.png'
import navbar3 from '/icon/navbar3.png'
import navbar4 from '/icon/navbar6.png'
import navbar5 from '/icon/navbar5.png'
import { Link, NavLink } from "react-router-dom";

function SideNavbar(){
    const bg = "url('/icon/hover.png')";

    const [tanggal, setTanggal] = useState();
    const [bulan, setBulan] = useState();
    const [tahun, setTahun] = useState();
    const [jam, setJam] = useState();
    const [menit, setMenit] = useState();

    const style = {
        backgroundImage: bg,
        backgroundRepeat: "no-repeat",
        backgroundSize : "auto"
    }

    const time = () => {
        const waktu = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        setTanggal(waktu.getDate());
        setBulan(months[waktu.getMonth()]);
        setTahun(waktu.getFullYear());
        setJam(waktu.getHours());
        setMenit(waktu.getMinutes());
    }

    useEffect(() => {
        setInterval(() => {
            time();
        }, 1000);
    }, [])

    return <>
        <div className='w-full flex flex-row bg-gray-200 h-screen py-10'>
            <div className='w-full h-full bg-gray-50 ms-10 rounded-2xl drop-shadow-lg flex flex-col justify-evenly items-center'>
                <div className='h-32 flex justify-center items-center'>
                    <img src={logo} width="90%" className='h-full' />
                </div>
                <div className='w-3/5 h-9'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/admin/home`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>    
                        <img src={navbar1} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Home</p>
                    </NavLink>
                </div>
                <div className='w-3/5 h-9'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/admin/recipes`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar2} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Recipes</p>
                    </NavLink>
                </div>
                <div className='w-3/5 h-9'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/admin/patient-list`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar3} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Patient List</p>
                    </NavLink>
                </div>
                <div className='w-3/5 h-9'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/admin/settings`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar4} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Settings</p>
                    </NavLink>
                </div>
                <div className='w-3/5 h-9'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/admin/subscriptions`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar5} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Subscription</p>
                    </NavLink>
                </div>
                
                {/* Logout */}
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='border-black border rounded-xl w-2/3 h-28 text-lg font-semibold rotate-6 flex flex-col justify-center items-center'>
                        <div>
                            {tanggal} {bulan} {tahun}
                        </div>
                        <div>
                            {jam}:{menit}
                        </div>
                    </div>
                    <Link className='bg-rose-300 border-black border rounded-xl w-2/3 py-3 mt-9 text-xl font-semibold -rotate-6 flex flex-col justify-center items-center hover:bg-rose-400' to={`/login`}>
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default SideNavbar;