import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import adminService from "../../../Services/Admin/admin"


function Profile(){
    const [user, setUser] = useState();
    const userId = localStorage.getItem("userId")
    const role = localStorage.getItem("userRole")
    const navigate = useNavigate();
    const cariData = async () => {
      // console.log(userId)
      // console.log(role)
      

      // const res = await adminService.getUserById();
    }

    useEffect(() => {
      cariData();
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
        <div className="overflow-scroll bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] ">
          asdasdasd
        </div>
      </div>
    </>
    )
}

export default Profile;