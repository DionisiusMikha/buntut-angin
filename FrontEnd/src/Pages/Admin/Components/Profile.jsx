import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import adminService from "../../../Services/Admin/admin"
import iconUser from "/icon/user.png";
import { Input } from '@chakra-ui/react'

function Profile(){
    const [users, setUsers] = useState({});
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")
    const role = localStorage.getItem("userRole")

    const cariUser = async () => {
      const res = await adminService.getUserById(role, userId);
      console.log(res.data)
      if( res.status == 200 ){
        setUsers(res.data)
      }
    }
    console.log(users)

    useEffect(() => {
      cariUser();
    }, [])

    return(
    <>
      <div className="mx-10 my-10">
        <div className="flex flex-row justify-between pb-6 ">
          <div className="text-4xl font-semibold">Detail User</div>
          <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
            navigate(-1);
          }}>back</button>
        </div>
        {/* PROFILE */}
        <div className="overflow-scroll bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10">
          {/* photo profile */}
          <div className="bg-white drop-shadow-lg rounded-lg py-5 px-10 flex flex-row">
            {users.profile_picture ? <img src={users.profile_picture} alt="ADA" /> : <img src={iconUser} alt="KOSONG" width={"150px"}/>}
            <div className="flex flex-col justify-center">
              <div className="text-2xl font-bold px-10">{users.display_name}</div>
              {role ==  "Dietisian" && 
              <div>
                <div className="text-xl px-10">Weight : {users.weight} Kg</div>
                <div className="text-xl px-10">Height : {users.height} Cm</div>
              </div>}
            </div>
          </div>
          {/* detail profile */}
          <div>

          </div>
        </div>
      </div>
    </>
    )
}

export default Profile;