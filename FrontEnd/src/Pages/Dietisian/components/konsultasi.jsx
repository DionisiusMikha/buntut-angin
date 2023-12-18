import DietisianService from "../../../Services/Dietisian/dietisian";
import { useState, useEffect } from "react";

import iconUser from "/icon/user.png";
import PengajuanKonsultasi from './pengajuanKonsultasi';

export default function Konsultasi() {
    const [listKonsultan, setListKonsultan] = useState([]);
    const [pengajuanIsOpen, setPengajuanIsOpen] = useState(false);
    const [doctorId, setDoctorId] = useState('');
    const [user, setUser] = useState ({});

    const fetch = async() => {
        try {
            const result = await DietisianService.getAllKonsultan();

            setListKonsultan([...result.data]);
        } catch (error) {
            throw error;
        }
    }

    const getUser = async() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        } else {
            try {
                const res = await DietisianService.getUserLogin(token);
                if (res.status == 200){
                    setUser(res.data.data);
                } else {
                    navigate("/login");
                }
                } catch (error) {
            }
        }
    }

    const openPengajuan = () => {
        setPengajuanIsOpen(true);
    }

    const closePengajuan = () => {
        setPengajuanIsOpen(false);
    }

    useEffect(() => {
        getUser();
        fetch();
    }, [])

    return (
        <>
            <div className="w-full h-full px-8 py-10">
                {console.log(user)}
                <div className="w-full h-full flex flex-col items-center bg-white rounded-xl px-24 py-12">
                    <h1 className="mb-8 text-3xl font-semibold">Pilih Konsultan</h1>
                    <div className="overflow-y-auto no-scrollbar w-full h-full grid grid-cols-3 gap-y-12 gap-x-12">
                        {listKonsultan.map((item, idx) => (
                            <div key={idx} className="w-10/12 h-96 flex flex-col justify-center items-center bg-slate-50 gap-y-4 rounded-xl shadow-xl" onClick={() => {
                                setDoctorId(item.id);
                                openPengajuan();
                            }}>
                                <img src={iconUser} alt="profile" className="h-24"/>
                                <h1 className="text-2xl font-semibold">{item.display_name}</h1>
                                <p className="text-base">{item.email}</p>
                                <p className="text-base">{item.phone_number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {pengajuanIsOpen && <PengajuanKonsultasi isOpen={pengajuanIsOpen} onClose={closePengajuan} doctor_id={doctorId} user_id={user.id}/>}
        </>
    )
}