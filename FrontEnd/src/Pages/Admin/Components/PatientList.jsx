import {useState, useEffect} from 'react';
import dietisianService from "../../../Services/Dietisian/dietisian";
import doctorService from '../../../Services/Konsultan/doctor';

function PatientList() {
    const [limit, setLimit] = useState(10);
    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');

    const getAllUser = async () => {
        const responseUser = await dietisianService.getAllUsers();
        console.log(responseUser);
        const responseDoctor = await doctorService.getAllDoctor();
        console.log(responseDoctor);
    }

    useEffect(() => {
        getAllUser();
        // console.log(limit);
        // console.log(user);
        // console.log(search);
    }, [limit, user, search])

    return (
        <>
           <div className="mx-10 my-10">
                <div className="flex flex-row justify-between">
                    <div className="text-4xl font-semibold mb-6">All User</div>
                    <button className="bg-blue-300 rounded-xl px-4 mb-4 text-xl font-semibold">Add New User</button>
                </div>
                <div  className="flex flex-row justify-between items-center">
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
                    <div className="rounded-lg py-2 px-4 mb-4 text-xl font-semibold flex items-center justify-center">
                        <span className="me-3">User</span>
                        <select className="bg-gray-200" onChange={(e)=>{
                            setUser(e.target.value)
                        }}>
                            <option value="">all</option>
                            <option value="dietisian">dietisian</option>
                            <option value="konsultan">konsultan</option>
                        </select>        
                    </div>
                    <div className="text-xl font-semibold">
                        <label className="me-3">Search : </label>
                        <input type="text" className="py-2 px-2 rounded" onChange={(e)=>{
                            setSearch(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="bg-white min-h-[calc(100vh-13rem)] sm:rounded-3xl drop-shadow-lg">
                    {/* header */}
                    <table className='w-full rounded-lg table-fixed'>
                        <thead className='bg-gray-300 h-14'>
                            <tr>
                                <th>a</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>b</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
           </div>
        </>
    )
}

export default PatientList;