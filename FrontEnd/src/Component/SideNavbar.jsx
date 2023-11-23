import React, { useEffect, useState } from 'react';
import logo from '/img/Logo-lebar 1.png'
import navbar1 from '/icon/navbar1.png'
import navbar2 from '/icon/navbar2.png'
import navbar3 from '/icon/navbar3.png'
import navbar4 from '/icon/navbar4.png'
import { Link, NavLink, useNavigate } from "react-router-dom";

function SideNavbar({hovered}){
    const bg = "url('/icon/hover.png')";
    const navigate = useNavigate();

    const [tanggal, setTanggal] = useState();
    const [bulan, setBulan] = useState();
    const [tahun, setTahun] = useState();
    const [jam, setJam] = useState();
    const [menit, setMenit] = useState();

    const style = {
        backgroundImage: bg,
        backgroundRepeat: "no-repeat"
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
                <div className='w-1/2 h-8'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/dietisian/home`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>    
                        <img src={navbar1} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Home</p>
                    </NavLink>
                </div>
                <div className='w-1/2 h-8'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/dietisian/recipes`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar2} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Recipes</p>
                    </NavLink>
                </div>
                <div className='w-1/2 h-8'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/dietisian/report`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar3} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Report</p>
                    </NavLink>
                </div>
                <div className='w-1/2 h-8'>
                    <NavLink className='w-full h-full flex justify-start items-center' to={`/dietisian/chat`} style={(state) => {
                        return state.isActive ? style : {backgroundColor:"transparent"}
                    }}>
                        <img src={navbar4} alt="" className='w-7'/>
                        <p className='text-2xl text-black font-semibold ms-2'>Chat</p>
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

                {/* <div className='w-24 flex justify-start' style={hovered=="home" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}} onClick={()=>{
                    navigate("/dietisian");
                }}>
                    <div className='w-full flex flex-row'>
                        <img src={navbar1} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold '>Home</div>
                    </div>
                </div>
                <div className='w-24 flex justify-start' style={hovered=="recipes" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}} onClick={()=>{
                    navigate("/dietisian/recipes");
                }}>
                    <div className='w-full flex flex-row justify-center'>
                        <img src={navbar2} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Recipes</div>
                    </div>
                </div>
                <div className='w-24 flex justify-start' style={hovered=="report" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}} onClick={()=>{
                    navigate("/dietisian/report");
                }}>
                    <div className='w-full flex flex-row justify-center'>
                        <img src={navbar3} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Report</div>
                    </div>
                </div>
                <div className='w-24 flex justify-start' style={hovered=="chat" ? {backgroundImage:bg, backgroundRepeat:"no-repeat"} : {backgroundColor:"transparent"}} onClick={()=>{
                    navigate("/dietisian/chat");
                }}>
                    <div className='w-full flex flex-row justify-center'>
                        <img src={navbar4} alt="" className='me-5'/>
                        <div className='text-2xl text-black font-semibold'>Chat</div>
                    </div>
                </div> */}
                
                {/* LOGOUT */}
                {/* <div className='flex flex-col justify-center items-center mt-14'>
                    <div className='border-black border rounded-xl w-2/3 h-28 text-lg font-semibold rotate-6 flex flex-col justify-center items-center'>
                        <div>
                            {tanggal} {bulan} {tahun}
                        </div>
                        <div>
                            {jam}:{menit}
                        </div>
                    </div>
                    <button className='bg-rose-300 border-black border rounded-xl w-2/3 py-3 mt-9 text-xl font-semibold -rotate-6 flex flex-col justify-center items-center hover:bg-rose-400' onClick={()=>{
                        navigate("/login");
                    }}>
                        Log Out
                    </button>
                </div> */}
            </div>
        </div>
    </>
}

export default SideNavbar;