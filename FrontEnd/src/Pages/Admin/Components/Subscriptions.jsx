import acc from '/icon/acc.png';
import menu from "/icon/menu.png";
import {useState, useEffect} from 'react';
import adminService from '../../../Services/Admin/admin';
import {useNavigate} from "react-router-dom";

function Subscriptions() {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const getAllUser = async () => {
        const allSubs = await adminService.getAllSubs(limit, search);
        setUsers(allSubs.data);
        console.log(allSubs.data);
    }

    useEffect(() => {
        getAllUser();
    }, [limit, search])
    
    return (
        <>
           <div className="mx-10 my-10">
                <div className="flex flex-row justify-between">
                    <div className="text-4xl font-semibold mb-6">List Subscription</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="rounded-lg py-2 mb-4 text-xl font-semibold flex items-center justify-center">
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
                        <div id='thead' className='w-full h-12 bg-gray-300 flex justify-around items-center px-6'>
                            <div className='w-6/12 flex items-center gap-x-3'>
                                <img src={acc} className="w-5 h-5" />
                                <p className='text-xl'>Name</p>
                            </div>
                            <div className='w-3/12 flex items-center gap-x-3'>
                                <img src={acc} className="w-5 h-5" />
                                <p className='text-xl'>Period</p>
                            </div>
                            <div className='w-2/12 flex items-center gap-x-3'>
                                <img src={acc} className="w-5 h-5" />
                                <p className='text-xl'>Status</p>
                            </div>
                            <div className='w-1/12 flex items-center gap-x-3'>
                                {/* <img src={menu} className="w-5 h-5" /> */}
                            </div>
                        </div>
                        {users.map((user, index) => {
                            return <div id='tbody' className='w-full h-12 bg-white flex justify-around items-center px-6' key={index}>
                                <div className='w-6/12 flex items-center gap-x-3'>
                                    <p className='text-xl'>{user.name}</p>
                                </div>
                                <div className='w-3/12 flex items-center'>
                                    <p className={`text-xl w-2/3 py-1`}>{user.period}</p>
                                </div>
                                <div className='w-2/12 flex items-center gap-x-3'>
                                    <p className={`text-xl w-2/3 rounded-full py-1 text-center font-semibold ${user.status == "active" ? "bg-blue-200" : "bg-rose-200"}`}>{user.status}</p>
                                </div>
                                <div className='w-1/12 flex items-center gap-x-3'>
                                    <img src={menu} className="w-5 h-5" onClick={()=>{
                                        navigate(`/admin/subscriptions/detail/${user.userId}`);
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

export default Subscriptions;