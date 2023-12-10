import {useState, useEffect} from 'react';
import adminService from '../../../Services/Admin/admin';
import {useNavigate} from "react-router-dom";

function Subscriptions() {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const getAllUser = async () => {
        const allUser = await adminService.getAllUsers(limit, filter, search);
        setUsers(allUser.data);
        // console.log(allUser.data);
    }

    useEffect(() => {
        getAllUser();
    }, [limit, filter, search])
    
    return (
        <>
           <div className="mx-10 my-10">
                <div className="flex flex-row justify-between">
                    <div className="text-4xl font-semibold mb-6">List Subscription</div>

                </div>
            </div>
        </>
    )
}

export default Subscriptions;