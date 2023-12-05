import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import adminService from "../../../Services/Admin/admin"
import iconUser from "/icon/user.png";
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import change from "/icon/change.png"
import { FaHome } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

function Profile(){
    const [users, setUsers] = useState({});
    const [dob, setdob] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")
    const role = localStorage.getItem("userRole")

    const cariUser = async () => {
      const res = await adminService.getUserById(role, userId);
      // console.log(res.data)
      if( res.status == 200 ){
        setUsers(res.data)
        
        let tgl = new Date(res.data.birthdate)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let hasil = `${tgl.getDate()} ${months[tgl.getMonth()]} ${tgl.getFullYear()}`;
        setdob(hasil)
      }
    }

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
            {/* <div className="bg-white rounded-full p-4 drop-shadow-md h-16 w-16 -ms-10 mt-[85px]">
              <img src={change} alt="" className="m-auto p-auto"/>
            </div> */}
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-bold px-10">{users.display_name}</div>
              {role ==  "Dietisian" && 
              <div>
                <div className="text-xl px-10">Weight : {users.weight} Kg</div>
                <div className="text-xl px-10">Height : {users.height} Cm</div>
                <div className="text-xl px-10">Age : {users.age} y.o.</div>
              </div>}
            </div>
          </div>
          {/* detail profile */}
          <div className="mt-10">
            {/* display name */}
            <div className="flex flex-col">
              <div>Display Name : </div>
              <Input size='md' value={users.display_name}  />
            </div>
            {/* username */}
            <div className="flex flex-col mt-4">
              <div>Username : </div>
              <Input size='md' value={users.username}  />
            </div>
            {/* Email & phone number */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col mt-4">
                <div>Email : </div>
                <InputGroup size='lg'>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='tel' value={users.email} />
                </InputGroup>
              </div>
              <div className="flex flex-col mt-4">
                <div>Phone Number : </div>
                <InputGroup size='lg'>
                  <InputLeftElement pointerEvents='none'>
                    <PhoneIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='tel' value={users.phone_number} />
                </InputGroup>
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-col mt-4">
              <div>Address : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={FaHome} color='gray.300' />
                </InputLeftElement>
                <Input type='tel' value={users.address} />
              </InputGroup>
            </div>
            {/* Birthdate */}
            <div className="flex flex-col mt-4">
              <div>Birthdate : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={LiaBirthdayCakeSolid} color='gray.300' />
                </InputLeftElement>
                <Input type='tel' value={dob} />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default Profile;