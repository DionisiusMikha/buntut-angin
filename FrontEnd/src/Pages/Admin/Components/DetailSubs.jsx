import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import adminService from "../../../Services/Admin/admin"

function DetailSubs(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const cariDetail = async() =>{
        const id = window.location.pathname.split("/")[4];
        const res = await adminService.getDetailSubs(id);
        setUsers(res.data.user);
        setList(res.data.data);
        setTotal(res.data.total);
    }

    useEffect(() => {
        cariDetail();
    }, [])

    return(<>
        <div className="mx-10 my-10">
            <div className="flex flex-row justify-between pb-6">
                <div className="text-4xl font-semibold">Detail Subscription</div>
                <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                    navigate(-1);
                }}>back</button>
            </div>
            <div className="bg-white h-20 sm:rounded-3xl drop-shadow-lg mb-6 px-7 py-5 flex flex-row justify-between">
                <div className='font-semibold text-2xl'>{users.display_name}</div>
                <div className='font-semibold text-2xl'>Total Bayar : {total}</div>
            </div>
            <div className="bg-white min-h-[calc(100vh-13rem)] sm:rounded-3xl drop-shadow-lg">
                <div className="overflow-y-auto w-full h-5/6 flex flex-col bg-white rounded-t-xl">
                    <div id='thead' className='w-full h-12 bg-gray-300 flex justify-around items-center px-6'>
                        <div className='w-1/12 flex items-center gap-x-3'>
                            <p className='text-xl font-semibold'>No</p>
                        </div>
                        <div className='w-3/12 flex items-center gap-x-3'>
                            <p className='text-xl font-semibold'>Invoice Id</p>
                        </div>
                        <div className='w-3/12 flex items-center gap-x-3'>
                            <p className='text-xl font-semibold'>Period</p>
                        </div>
                        <div className='w-3/12 flex items-center gap-x-3'>
                            <p className='text-xl font-semibold'>Status Pembayaran</p>
                        </div>
                        <div className='w-3/12 flex items-center gap-x-3'>
                            <p className='text-xl font-semibold'>Status Subscriptions</p>
                        </div>
                    </div>
                    {list.map((item, index) =>{
                        return <div id='tbody' className='w-full h-12 bg-white flex justify-around items-center px-6 border' key={index}>
                            <div className='w-1/12 flex items-center'>
                                <p className={`text-xl w-2/3 py-1`}>{index + 1}</p>
                            </div>
                            <div className='w-3/12 flex items-center'>
                                <p className={`text-xl w-2/3 py-1`}>{item.invoice_id}</p>
                            </div>
                            <div className='w-3/12 flex items-center'>
                                <p className={`text-xl w-2/3 py-1`}>{item.period}</p>
                            </div>
                            <div className='w-3/12 flex items-center'>
                                <p className={`text-xl w-2/3 py-1`}>{item.statusPembayaran == -1 ? "Cancelled" : item.statusPembayaran == 0 ? "Pending" : "Success"}</p>
                            </div>
                            <div className='w-3/12 flex items-center'>
                                <p className={`text-xl w-2/3 py-1`}>{item.status}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>)
}

export default DetailSubs;