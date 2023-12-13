import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Input, InputGroup, InputLeftElement, Icon, InputRightElement, Button } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import { LiaBirthdayCakeSolid } from "react-icons/lia";

import iconUser from "/icon/user.png";
import { useForm } from 'react-hook-form'
import {useNavigate} from "react-router-dom";
import KonsultanService from "../../../Services/konsultan/doctor";

const Settings = () => {
  const [user, setUser] = useState({});
  const [dob, setdob] = useState("");
  const userId = localStorage.getItem("userId")
  const role = localStorage.getItem("userRole")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const navigate = useNavigate();
  
  const {register, handleSubmit, reset, formState: { errors }  } = useForm({
    values : {
      name : user?.display_name,
      username : user?.username,
      email : user?.email,
      phone_number : user?.phone_number,
      address : user?.address,
      birthdate : dob,
      password : user?.password,
    }
  });

  const cariUser = async () => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/login");
    } else {
        try {
          const res = await KonsultanService.getUserLogin(token);
          if (res.status == 200){
              setUser({...res.data.data});
              let tgl = new Date(res.data.data.birthdate)
              let bulan = tgl.getMonth() + 1;
              if (bulan < 10){
                bulan = "0" + bulan;
              }
              let hasil = `${tgl.getFullYear()}-${bulan}-${tgl.getDate()}`;
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

  const submit = async (data) => {
    const res = await KonsultanService.editUser(user.id, data);
  }
  
  return(
    <div className="w-full h-full flex py-10 px-12">
      {/* PROFILE */}
      <form className="overflow-scroll bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10" onSubmit={handleSubmit(submit)}>
        {/* photo profile */}
        <div className="bg-white drop-shadow-lg rounded-lg py-5 px-10 flex flex-row items-center">
          <img src={iconUser} alt="KOSONG" className="h-24"/>
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
            <Input size='md' {...register("name")} />
          </div>
          {/* username */}
          <div className="flex flex-col mt-4">
            <div className="font-semibold text-xl">Username : </div>
            <Input size='md' {...register("username")} />
          </div>
          {/* Email & phone number */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col mt-4">
              <div className="font-semibold text-xl">Email : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='gray.300' />
                </InputLeftElement>
                <Input type='email' {...register("email")} />
              </InputGroup>
            </div>
            <div className="flex flex-col mt-4">
              <div className="font-semibold text-xl">Phone Number : </div>
              <InputGroup size='lg'>
                <InputLeftElement pointerEvents='none'>
                  <PhoneIcon color='gray.300' />
                </InputLeftElement>
                <Input type='tel' {...register("phone_number")} />
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
              <Input type='text'{...register("address")}/>
            </InputGroup>
          </div>
          {/* Birthdate */}
          <div className="flex flex-col mt-4">
            <div className="font-semibold text-xl">Birthdate : </div>
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <Icon as={LiaBirthdayCakeSolid} color='gray.300' />
              </InputLeftElement>
              <Input type='date' {...register("birthdate")} />
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
                disabled
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
                    {...register("newPassword", {
                      required: {
                        value: true,
                        message: "Please enter your new password"
                      }
                    })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.newPassword && <span style={{ color:"red" }}>{errors.newPassword.message}</span>}
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
          {/* button save or cancel */}
          <div className="flex flex-row justify-end mt-5">
            <button className="btn btn-outline btn-neutral btn-wide mx-5" onClick={()=>{
              navigate("/dietisian/home");
            }}>Cancel</button>
            <button className="btn btn-neutral btn-wide">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Settings;