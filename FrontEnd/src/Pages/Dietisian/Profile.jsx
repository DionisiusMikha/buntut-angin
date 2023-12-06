import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import iconUser from "/icon/user.png";

import DietisianService from "../../Services/Dietisian/dietisian";

const Profile = () => {
  const [user, setUser] = useState({});
  const [dob, setdob] = useState("");
  const userId = localStorage.getItem("userId")
  const role = localStorage.getItem("userRole")

  const cariUser = async () => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login");
    } else {
        try {
          const res = await DietisianService.getUserLogin(token);
          if (res.status == 200){
              setUser(res.data.data);
              let tgl = new Date(res.data.data.birthdate)
              const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              let hasil = `${tgl.getDate()} ${months[tgl.getMonth()]} ${tgl.getFullYear()}`;
              setdob(hasil)
          } else {
              navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
    }
  }

  useEffect(() => {
    cariUser();
  }, [])
  
  return(
    <div className="w-full h-full flex py-10 px-12">
      {/* PROFILE */}
      <div className="overflow-scroll bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10">
        {/* photo profile */}
        <div className="bg-white drop-shadow-lg rounded-lg py-5 px-10 flex flex-row items-center">
          {user.profile_picture ? <img src={user.profile_picture} alt="ADA" className="w-24"/> : <img src={iconUser} alt="KOSONG" className="h-24"/>}
          {/* <div className="bg-white rounded-full p-4 drop-shadow-md h-16 w-16 -ms-10 mt-[85px]">
            <img src={change} alt="" className="m-auto p-auto"/>
          </div> */}
          <div className="flex flex-col justify-center">
            <div className="text-3xl font-bold px-10">{user.display_name}</div>
            {role ==  "Dietisian" && 
            <div>
              <div className="text-xl px-10">Weight : {user.weight} Kg</div>
              <div className="text-xl px-10">Height : {user.height} Cm</div>
              <div className="text-xl px-10">Age : {user.age} y.o.</div>
            </div>}
          </div>
        </div>
        {/* detail profile */}
        <div className="mt-10">
          {/* display name */}
          <div className="flex flex-col">
            <div>Display Name : </div>
            <Input size='md' value={user.display_name}  />
          </div>
          {/* username */}
          <div className="flex flex-col mt-4">
            <div>Username : </div>
            <Input size='md' value={user.username}  />
          </div>
          {/* Email & phone number */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col mt-4">
              <div>Email : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='gray.300' />
                </InputLeftElement>
                <Input type='tel' value={user.email} />
              </InputGroup>
            </div>
            <div className="flex flex-col mt-4">
              <div>Phone Number : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <PhoneIcon color='gray.300' />
                </InputLeftElement>
                <Input type='tel' value={user.phone_number} />
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
              <Input type='tel' value={user.address} />
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
  )
}

export default Profile;