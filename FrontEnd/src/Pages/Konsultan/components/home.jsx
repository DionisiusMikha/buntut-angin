import doctorService from '../../../Services/konsultan/doctor';
import { useState, useEffect } from 'react';
import menu from "/icon/menu.png";
import acc from '/icon/acc.png';
import { useDispatch, useSelector } from "react-redux"

import Status from './status';

function Home() {
    const namaHari = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [user, setUser] = useState();
    const [statusIsOpen, setStatusIsOpen] = useState(false);
    const [jadwal, setJadwal] = useState([]);
    const [currentDate, setCurrectDate] = useState(new Date());

    const fetchJadwal = async() => {
        const token = localStorage.getItem("tokenDoctor")
        
        const user = await doctorService.getUserLogin(token);
        
        const result = await doctorService.viewJadwal(user.data.data.id, currentDate);
        console.log(result.data);
        setJadwal([...result.data]);
    }

    const convertDate = (date) => {
        const format = new Date(date);
        const tahun = format.getFullYear();
        const month = format.getMonth();
        const day = format.getDate();

        return day + "-" + month + "-" + tahun;
    }

    const formatDate = () => {
        const day = currentDate.getDay();
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        return `${namaHari[day]}, ${date}/${month + 1}/${year}`;
    }

    const nextDate = () => {
        const nextDate = new Date(currentDate);

        nextDate.setDate(nextDate.getDate() + 1);

        if (nextDate.getDate() === 1) {
            nextDate.setMonth(nextDate.getMonth() + 1);
        }

        if (nextDate.getMonth() === 0 && nextDate.getDate() === 1) {
            nextDate.setFullYear(nextDate.getFullYear() + 1);
        }

        return setCurrectDate(new Date(nextDate));;
    }

    const previousDate = () => {
        const prevDate = new Date(currentDate);

        prevDate.setDate(prevDate.getDate() - 1);
      
        if (prevDate.getDate() === (new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 0)).getDate()) {
          prevDate.setMonth(prevDate.getMonth() - 1);
        }
      
        if (prevDate.getMonth() === 11 && prevDate.getDate() === 31) {
          prevDate.setFullYear(prevDate.getFullYear() - 1);
        }

        return setCurrectDate(new Date(prevDate));;
    }

    const openStatus = (user) => {
        if(user.status == 1 || user.status == 2){
            return;
        }
        setUser(user);
        setStatusIsOpen(true);
    }

    const closeStatus = () => {
        setUser('');
        setStatusIsOpen(false);
        location.reload();
    }

    useEffect(() => {
        fetchJadwal();
    }, [currentDate]);


    return(
        <>
            <div className="w-full h-full px-8 pt-10">
                <div className="h-16 w-full flex justify-end items-center mb-10">
                    <button className="w-16 h-full text-5xl pb-2 rounded-l-3xl bg-white" onClick={previousDate}>«</button>
                    <div className="w-68 h-full flex items-center">
                        <p className="min-w-full h-full text-2xl bg-white flex justify-center items-center">{formatDate()}</p>
                    </div>
                    <button className="w-16 h-full text-5xl pb-2 rounded-r-3xl bg-white" onClick={nextDate}>»</button>
                </div>
                <div className="overflow-y-auto w-full h-5/6 flex flex-col bg-white rounded-xl">
                    <div id='thead' className='w-full h-12 bg-gray-300 flex justify-around items-center px-12'>
                        <div className='w-5/12 flex justify-center items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-2xl'>Name</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3 ps-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-2xl'>Jadwal</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3 ps-2'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-2xl'>Jam</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3 ps-1'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-2xl'>Status</p>
                        </div>
                        <div className='w-1/12'></div>
                    </div>
                    {jadwal.map((item, idx) => (
                        <div key={idx} id='tbody' className='w-full h-12 flex justify-around items-center px-12 my-2'>
                            <div className='w-5/12 flex items-center'>
                                <p className='text-2xl'>{item.display_name}</p>
                            </div>
                            <div className='w-2/12 flex items-center'>
                                <p className='text-2xl'>{convertDate(item.tanggal)}</p>
                            </div>
                            <div className='w-2/12 flex items-center'>
                                <p className='text-2xl'>{item.jam}</p>
                            </div>
                            <div className='w-2/12 flex justify-start items-center ps-1'>
                                {item.status === 0 ? (
                                    <p className='w-24 h-8 flex justify-center items-center rounded-lg text-2xl text-white bg-yellow-400'>WAIT</p>
                                ) : item.status === 1 ? (
                                    <p className='w-24 h-8 flex justify-center items-center rounded-lg text-2xl text-white bg-green-500'>DONE</p>
                                ) : (
                                    <p className='w-24 h-8 flex justify-center items-center rounded-lg text-2xl text-white bg-red-500'>REJECT</p>
                                )}
                            </div>
                            <div className='w-1/12 flex justify-end items-center'>
                                <button className='w-6 flex justify-center items-center' onClick={() => {
                                    const data = {
                                        id: item.id,
                                        nama: item.display_name,
                                        status: item.status
                                    }
                                    openStatus(data)
                                }}>
                                    <img src={menu} className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {statusIsOpen && <Status isOpen={statusIsOpen} onClose={closeStatus} user={user}/>}
            </div>
        </>
    )
}

export default Home;