import {useState, useEffect} from 'react';
import doctorService from '../../../Services/konsultan/doctor';
import acc from '/icon/acc.png';
import menu from "/icon/menu.png";
import {useNavigate} from "react-router-dom";

function PatientList() {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("dietisian");
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const getAllUser = async () => {
        const allUser = await doctorService.getAllUsers(limit, filter, search);
        setUsers(allUser.data);
    }

    useEffect(() => {
        getAllUser();
    }, [limit, filter, search])

    return (
        <>
           <div className="mx-10 my-10">
                <div className="flex flex-row justify-between">
                    <div className="text-4xl font-semibold mb-6">All Dietisian</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="rounded-lg py-2 px-4 mb-4 text-xl font-semibold flex items-center justify-center">
                        <span className="me-3">Show</span>
                            <select className="bg-gray-200" onChange={(e)=>{
                                setLimit(e.target.value)
                            }}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="">all</option>
                            </select>
                        <span className="ms-3">Entries</span>
                    </div>
                    <div className="text-xl font-semibold">
                        <label className="me-3">Search : </label>
                        <input type="text" className="py-2 px-2 rounded" onChange={(e)=>{
                            setSearch(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="bg-white min-h-[calc(100vh-13rem)] sm:rounded-3xl drop-shadow-lg">
                    <div className="overflow-y-auto w-full h-5/6 flex flex-col bg-white rounded-t-xl">
                        <div id='thead' className='w-full h-12 bg-gray-300 flex justify-around items-center px-12'>
                            <div className='w-12/12 flex justify-center items-center gap-x-3'>
                                <img src={acc} className="w-5 h-5" />
                                <p className='text-xl'>Dietisian List</p>
                            </div>
                        </div>
                        {users.map((user, index) => {
                            return <div id='tbody' className='w-full h-12 bg-white flex justify-around items-center px-12' key={index}>
                                <div className='w-8/12 flex justify-start items-center gap-x-3'>
                                    <p className='text-xl me-2'>{(index + 1) + ". "}</p>
                                    <p className='text-xl'>{user.name}</p>
                                </div>
                                <div className='w-4/12 flex justify-end items-center gap-x-3'>
                                    <img src={menu} className="w-5 h-5" onClick={()=>{
                                        navigate(`/konsultan/patient-list/${user.id}`)
                                    }}/>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
           </div>
        </>
    )
}

export default PatientList;