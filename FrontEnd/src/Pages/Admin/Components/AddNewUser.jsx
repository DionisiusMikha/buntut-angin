import { useNavigate } from "react-router-dom";
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import { FaHome } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useState, useEffect } from "react"

function AddNewUser() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    return (
        <>
           <div className="mx-10 my-10">
                <div className="flex flex-row justify-between">
                    <div className="text-4xl font-semibold mb-6">Add New User</div>
                        <div>
                        <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                            navigate(-1);
                        }}>back</button>
                    </div>
                </div>

                {role == "" && 
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10">
                    <div className="text-3xl font-semibold mb-4 text-center">Select Role</div>
                    <div className="flex flex-row justify-center">
                        <button className="bg-blue-300 rounded-xl px-4 py-2 mx-3 mb-4 text-2xl font-semibold hover:animate-spin" onClick={()=>{
                            setRole("dietisian");
                        }}>Dietisian</button>
                        <button className="bg-blue-300 rounded-xl px-4 py-2 mx-3 mb-4 text-2xl font-semibold" onClick={()=>{
                            setRole("doctor");
                        }}>Konsultan</button>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default AddNewUser;