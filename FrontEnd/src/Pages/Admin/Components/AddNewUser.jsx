import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"

import { Input, InputGroup, InputLeftElement, Icon, InputRightElement, Button, Select } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import { FaHome } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

import adminService from "../../../Services/Admin/admin";

function AddNewUser() {
    const {register, handleSubmit, reset, formState: { errors }  } = useForm();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [error, setError] = useState("")

    const handleClick = () => setShow(!show)
    const handleClick1 = () => setShow1(!show)
    const submit = async (data) =>{
      if (data.password == data.confirmPassword){
        setError("")
        if (role == "doctor"){
          const res = await adminService.addNewDoctor(data.name, data.username, data.email, data.phoneNumber, data.address, data.birthdate,data.password);
          console.log(res.data)
          if (res.data.message == "success"){
            navigate("/admin/patient-list")
          } else {
            setError(res.data.msg)
          }
        } else if (role == "dietisian"){
          const res = await adminService.addNewDietisian(data.name, data.email, data.username, data.password, data.birthdate, data.phoneNumber, data.address, data.weight, data.height, data.gender)
          console.log(res.data)
          if (res.data.message == "success"){
            navigate("/admin/patient-list")
          } else {
            setError(res.data.msg)
          }
        }
      } else {
        setError("Password and confirm password must be same")
      }
    }

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
                
                {/* pilih role */}
                {role == "" && <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10">
                    <div className="text-3xl font-semibold mb-4 text-center">Select Role</div>
                    <div className="flex flex-row justify-center">
                        <button className="bg-green-300 rounded-xl px-4 py-2 mx-3 mb-4 text-2xl font-semibold" onClick={()=>{
                            setRole("dietisian");
                        }}>Dietisian</button>
                        <button className="bg-blue-300 rounded-xl px-4 py-2 mx-3 mb-4 text-2xl font-semibold" onClick={()=>{
                            setRole("doctor");
                        }}>Konsultan</button>
                    </div>
                </div>}

                {/* role dietisian */}
                {role == "dietisian" && <form className="items-center justify-center bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10" onSubmit={handleSubmit(submit)} >
                  <div className="text-3xl font-semibold text-center mb-10">Enter your Information</div>
                  <div className="text-2xl font-semibold mb-5">Role : <span className="bg-green-200 rounded-full py-1 px-5">Dietisian</span></div>
                  {/* display name & username */}
                  <div className="grid grid-cols-2 gap-12 h-20">
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Display Name : </div>
                      <Input focusBorderColor='black' size='md'
                      placeholder='Enter name'
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Please enter your name"
                        }
                      })}/>
                      {errors.name && <span style={{ color:"red" }}>{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Username : </div>
                      <Input focusBorderColor='black' size='md'
                      placeholder='Enter username' 
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Please enter your username"
                        }
                      })}/>
                      {errors.username && <span style={{ color:"red" }}>{errors.username.message}</span>}
                    </div>
                  </div>
                  {/* Email & phone */}
                  <div className="grid grid-cols-2 gap-12 h-28">
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Email : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <EmailIcon color='gray.300' />
                        </InputLeftElement>
                        <Input focusBorderColor='black'  type='email'
                        placeholder='Enter email' {...register("email", {
                          required: {
                            value: true,
                            message: "Please enter your email"
                          }
                        })}/>
                      </InputGroup>
                      {errors.email && <span style={{ color:"red" }}>{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Phone Number : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <PhoneIcon color='gray.300' />
                        </InputLeftElement>
                        <Input focusBorderColor='black' type='tel'
                        placeholder='Enter phone number' {...register("phoneNumber", {
                          required: {
                            value: true,
                            message: "Please enter your phone number"
                          }
                        })}/>
                      </InputGroup>
                      {errors.phoneNumber && <span style={{ color:"red" }}>{errors.phoneNumber.message}</span>}
                    </div>
                  </div>
                  {/* address & birthdate */}
                  <div className="grid grid-cols-2 gap-12 h-28">
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Address : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <Icon as={FaHome} color='gray.300' />
                        </InputLeftElement>
                        <Input  focusBorderColor='black'
                        placeholder='Enter address' {...register("address", {
                          required: {
                            value: true,
                            message: "Please enter your address"
                          }
                        })}/>
                      </InputGroup>
                      {errors.address && <span style={{ color:"red" }}>{errors.address.message}</span>}
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Birthdate : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <Icon as={LiaBirthdayCakeSolid} color='gray.300' />
                        </InputLeftElement>
                        <Input focusBorderColor='black' type='date'{...register("birthdate", {
                          required: {
                            value: true,
                            message: "Please enter your birthdate"
                          }
                        })}/>
                      </InputGroup>
                      {errors.birthdate && <span style={{ color:"red" }}>{errors.birthdate.message}</span>}
                    </div>
                  </div>
                  {/* pass & conf pass */}
                  <div className="grid grid-cols-2 gap-12 h-28">
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Password : </div>
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
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Confirm Password : </div>
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
                  {/* weight, height, gender */}
                  <div className="grid grid-cols-3 gap-12 h-28 mt-8">
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Weight : </div>
                      <Input focusBorderColor='black' size='lg'
                      placeholder='Enter weight'
                      {...register("weight", {
                        required: {
                          value: true,
                          message: "Please enter your weight"
                        }
                      })}/>
                      {errors.weight && <span style={{ color:"red" }}>{errors.weight.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Height : </div>
                      <Input focusBorderColor='black' size='lg'
                      placeholder='Enter height' 
                      {...register("height", {
                        required: {
                          value: true,
                          message: "Please enter your height"
                        }
                      })}/>
                      {errors.height && <span style={{ color:"red" }}>{errors.height.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Gender : </div>
                      <Select placeholder='Select gender' size='lg' {...register("gender", {
                        required: {
                          value: true,
                          message: "Please enter your gender"
                        }
                      })}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                      </Select>
                      {errors.gender && <span style={{ color:"red" }}>{errors.gender.message}</span>}
                    </div>
                  </div>
                  {/* button */}
                  <div className="flex flex-col justify-center w-full mt-1 items-center ">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72">
                        Save 
                    </button>
                    {error != "" && <span className="text-center" style={{ color:"red" }}>{error}</span>}
                  </div>
                </form>}

                {/* role doctor */}
                {role == "doctor" && <form className="items-center justify-center bg-white rounded-2xl w-full min-h-[calc(100vh-9rem)] drop-shadow-xl px-10 py-10" onSubmit={handleSubmit(submit)} >
                  <div className="text-3xl font-semibold text-center mb-10">Enter your Information</div>
                  <div className="text-2xl font-semibold mb-5">Role : <span className="bg-blue-200 rounded-full py-1 px-5">Konsultan</span></div>
                  {/* display name & username */}
                  <div className="grid grid-cols-2 gap-12 h-20">
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Display Name : </div>
                      <Input focusBorderColor='black' size='md'
                      placeholder='Enter name'
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Please enter your name"
                        }
                      })}/>
                      {errors.name && <span style={{ color:"red" }}>{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-xl">Username : </div>
                      <Input focusBorderColor='black' size='md'
                      placeholder='Enter username' 
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Please enter your username"
                        }
                      })}/>
                      {errors.username && <span style={{ color:"red" }}>{errors.username.message}</span>}
                    </div>
                  </div>
                  {/* Email & phone */}
                  <div className="grid grid-cols-2 gap-12 h-28">
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Email : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <EmailIcon color='gray.300' />
                        </InputLeftElement>
                        <Input focusBorderColor='black'  type='email'
                        placeholder='Enter email' {...register("email", {
                          required: {
                            value: true,
                            message: "Please enter your email"
                          }
                        })}/>
                      </InputGroup>
                      {errors.email && <span style={{ color:"red" }}>{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Phone Number : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <PhoneIcon color='gray.300' />
                        </InputLeftElement>
                        <Input focusBorderColor='black' type='tel'
                        placeholder='Enter phone number' {...register("phoneNumber", {
                          required: {
                            value: true,
                            message: "Please enter your phone number"
                          }
                        })}/>
                      </InputGroup>
                      {errors.phoneNumber && <span style={{ color:"red" }}>{errors.phoneNumber.message}</span>}
                    </div>
                  </div>
                  {/* address & birthdate */}
                  <div className="grid grid-cols-2 gap-12 h-28">
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Address : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <Icon as={FaHome} color='gray.300' />
                        </InputLeftElement>
                        <Input  focusBorderColor='black'
                        placeholder='Enter address' {...register("address", {
                          required: {
                            value: true,
                            message: "Please enter your address"
                          }
                        })}/>
                      </InputGroup>
                      {errors.address && <span style={{ color:"red" }}>{errors.address.message}</span>}
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Birthdate : </div>
                      <InputGroup size='lg'>
                        <InputLeftElement pointerEvents='none'>
                          <Icon as={LiaBirthdayCakeSolid} color='gray.300' />
                        </InputLeftElement>
                        <Input focusBorderColor='black' type='date'{...register("birthdate", {
                          required: {
                            value: true,
                            message: "Please enter your birthdate"
                          }
                        })}/>
                      </InputGroup>
                      {errors.birthdate && <span style={{ color:"red" }}>{errors.birthdate.message}</span>}
                    </div>
                  </div>
                  {/* pass & conf pass */}
                  <div className="grid grid-cols-2 gap-12 h-28">
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Password : </div>
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
                    <div className="flex flex-col mt-8">
                      <div className="font-semibold text-xl">Confirm Password : </div>
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
                  {/* button */}
                  <div className="flex flex-col justify-center w-full mt-20 items-center ">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72">
                        Save 
                    </button>
                    {error != "" && <span className="text-center" style={{ color:"red" }}>{error}</span>}
                  </div>
                </form>}
            </div>
        </>
    )
}

export default AddNewUser;