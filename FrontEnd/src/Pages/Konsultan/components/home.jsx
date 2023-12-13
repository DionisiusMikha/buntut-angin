import doctorService from '../../../Services/Konsultan/doctor';
import { useState, useEffect } from 'react';
import menu from "/icon/menu.png";
import acc from '/icon/acc.png';

function Home() {
    const [jadwal, setJadwal] = useState([]);

    const fetchJadwal = async() => {
        const token = localStorage.getItem("token")
        
        const user = await doctorService.getUserLogin(token);
        console.log(user)
        const result = await doctorService.viewJadwal(user.data.data.id);
        setJadwal([...result.data]);
    }

    const convertDate = (date) => {
        const format = new Date(date);
        const tahun = format.getFullYear();
        const month = format.getMonth();
        const day = format.getDate();

        return day + "-" + month + "-" + tahun;
    }

    useEffect(() => {
        fetchJadwal();
    }, []);


    return(
        <>
            <div className="w-full h-full px-8 pt-10">
                <div className="h-16 w-full flex justify-end items-center mb-10">
                    <button className="w-16 h-full text-5xl pb-2 rounded-l-3xl bg-white">«</button>
                    <div className=" h-full flex items-center">
                        <p className="w-28 h-full text-2xl bg-white flex justify-center items-center">Monday</p>
                    </div>
                    <button className="w-16 h-full text-5xl pb-2 rounded-r-3xl bg-white">»</button>
                </div>
                <div className="overflow-y-auto w-full h-5/6 flex flex-col bg-white rounded-xl">
                    <div id='thead' className='w-full h-12 bg-gray-300 flex justify-around items-center px-6'>
                        <div className='w-5/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Name</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Jadwal</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Status</p>
                        </div>
                        <div className='w-1/12'></div>
                    </div>
                    {jadwal.map((item, idx) => (
                        <div key={idx} id='tbody' className='w-full h-12 flex justify-around items-center px-6'>
                            <div className='w-5/12 flex items-center'>
                                <p className='text-xl'>{item.display_name}</p>
                            </div>
                            <div className='w-2/12 flex items-center'>
                                <p className='text-xl'>{convertDate(item.tanggal)}</p>
                            </div>
                            <div className='w-2/12 flex justify-start items-center ps-1'>
                                {item.status === 0 ? (
                                    <p className='w-20 h-8 flex justify-center items-center rounded-lg text-xl text-white bg-yellow-400'>WAIT</p>
                                ) : item.status === 1 ? (
                                    <p className='w-20 h-8 flex justify-center items-center rounded-lg text-xl text-white bg-green-500'>DONE</p>
                                ) : (
                                    <p className='w-20 h-8 flex justify-center items-center rounded-lg text-xl text-white bg-red-500'>REJECT</p>
                                )}
                            </div>
                            <div className='w-1/12 flex justify-end items-center'>
                                <button className='w-6 flex justify-center items-center'>
                                    <img src={menu} className="w-5 h-5" onClick={()=>{
                                        localStorage.setItem("userRole", user.role);
                                        localStorage.setItem("userId", user.id);
                                        navigate(`/konsultan/home/detail-user`)
                                    }}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home;