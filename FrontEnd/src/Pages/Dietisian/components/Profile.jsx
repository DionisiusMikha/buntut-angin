import { MdOutlineKey } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Input, InputGroup, InputLeftElement, Icon, InputRightElement, Button, Select } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import { LiaBirthdayCakeSolid } from "react-icons/lia";

import iconUser from "/icon/user.png";
import { useForm } from 'react-hook-form'

import DietisianService from "../../../Services/Dietisian/dietisian";

const Profile = () => {
  const {register, handleSubmit, reset, formState: { errors }  } = useForm();
  const [user, setUser] = useState({});
  const [dob, setdob] = useState("");
  const userId = localStorage.getItem("userId")
  const role = localStorage.getItem("userRole")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)

  const cariUser = async () => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login");
    } else {
        try {
          const res = await DietisianService.getUserLogin(token);
          if (res.status == 200){
              console.log(res.data.data)
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

  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)
  const handleClick2 = () => setShow2(!show2)
  
  return(
    <div className="w-full h-full flex py-10 px-12">
      {/* PROFILE */}
      <form className="overflow-scroll bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10" >
        {/* photo profile */}
        <div className="bg-white drop-shadow-lg rounded-lg py-5 px-10 flex flex-row items-center">
          {user.profile_picture ? <img src={user.profile_picture} alt="ADA" className="w-24"/> : <img src={iconUser} alt="KOSONG" className="h-24"/>}
          <div className="bg-white rounded-full p-4 drop-shadow-md h-16 w-16 -ms-10 mt-[85px] p-auto">
            <Icon as={LuPenLine} boxSize={6} w={7} h={7}/>
          </div>
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
            <div className="font-semibold text-xl">Display Name : </div>
            <Input size='md' value={user.display_name}  />
          </div>
          {/* username */}
          <div className="flex flex-col mt-4">
            <div className="font-semibold text-xl">Username : </div>
            <Input size='md' value={user.username}  />
          </div>
          {/* Email & phone number */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col mt-4">
              <div className="font-semibold text-xl">Email : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='gray.300' />
                </InputLeftElement>
                <Input type='tel' value={user.email} />
              </InputGroup>
            </div>
            <div className="flex flex-col mt-4">
              <div className="font-semibold text-xl">Phone Number : </div>
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
            <div className="font-semibold text-xl">Address : </div>
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <Icon as={FaHome} color='gray.300' />
              </InputLeftElement>
              <Input type='tel' value={user.address} />
            </InputGroup>
          </div>
          {/* Birthdate */}
          <div className="flex flex-col mt-4">
            <div className="font-semibold text-xl">Birthdate : </div>
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <Icon as={LiaBirthdayCakeSolid} color='gray.300' />
              </InputLeftElement>
              <Input type='tel' value={dob} />
            </InputGroup>
          </div>
          {/* curr pass */}
          <div className="flex flex-col mt-4">
            <div className="font-semibold text-xl">Current Password : </div>
            <InputGroup size='lg'>
              <Input
                pr='4.5rem'
                type={show2 ? 'text' : 'password'}
                placeholder='Enter password'
                focusBorderColor='black'
                {...register("password", {
                  required: {
                    value: user?.password ,
                    message: "Please enter your password"
                  }
                })}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick2}>
                  {show2 ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <span style={{ color:"red" }}>{errors.password.message}</span>}
          </div>
          {/* new pass, conf pass */}
          <div className="grid grid-cols-2 gap-12 h-28">
              <div className="flex flex-col mt-4">
                <div className="font-semibold text-xl">New Password : </div>
                <InputGroup size='lg'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    focusBorderColor='black'
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter your password"
                      }
                    })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <span style={{ color:"red" }}>{errors.password.message}</span>}
              </div>
              <div className="flex flex-col mt-4">
                <div className="font-semibold text-xl">Confirm New Password : </div>
                <InputGroup size='lg'>
                  <Input
                    pr='4.5rem'
                    type={show1 ? 'text' : 'password'}
                    placeholder='Enter confirm password'
                    focusBorderColor='black'
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Please enter your confirm password"
                      }
                    })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick1}>
                      {show1 ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && <span style={{ color:"red" }}>{errors.confirmPassword.message}</span>}
              </div>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Profile;