import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import no from '/icon/no.png'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from "react";

function AddRecipe(){
    const navigate = useNavigate();
    const [active, setActive] = useState(1);

    const schema = Joi.object({
        name: Joi.string().required().messages({
            "string.empty":"food name tidak boleh kosong"
        }),
        desc: Joi.string().required().messages({
            "string.empty":"description tidak boleh kosong"
        }),
        calories: Joi.number().required().messages({
            "number.empty":"calories tidak boleh kosong"
        }),
        carbo: Joi.number().required().messages({
            "number.empty":"carbo tidak boleh kosong"
        }),
        protein: Joi.number().required().messages({
            "number.empty":"protein tidak boleh kosong"
        }),
        fat: Joi.number().required().messages({
            "number.empty":"fat tidak boleh kosong"
        }),
    })
    const {register, handleSubmit, reset, formState: { errors }  } = useForm({
        resolver: joiResolver(schema)
    });

    const submit = async data => {
        console.log(data);
    }

    const resetName = () =>{
        reset({ name: "" })
    }
    const resetDesc = () =>{
        reset({ desc: "" })
    }

    return(
        <>
            {/* semi navbar */}
            <div className="flex flex-row justify-between pb-6">
                <div className="text-4xl font-semibold">Add New Recipe</div>
                <div>
                    <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                        navigate(-1);
                    }}>back</button>
                </div>
            </div>
            {/* isi */}
            {/* STEPS */}
            
            <div className="bg-white rounded-xl px-10 py-10 min-h-[calc(100vh-9rem)] drop-shadow-lg">
                <div className="flex flex-row justify-center items-center mb-4">
                    <div className={` px-4 py-2 rounded-full ${active == 1 ? "bg-blue-200 font-bold" : "bg-gray-100"}`}>1</div>
                    <hr className="w-32 border-4"/>
                    <div className="bg-gray-100 px-4 py-2 rounded-full">2</div>
                    <hr className="w-32 border-4"/>
                    <div className="bg-gray-100 px-4 py-2 rounded-full">3</div>
                </div>
                <form onSubmit={handleSubmit(submit)} className="flex flex-row justify-between">
                    <div className="w-2/5">
                        {/* Food Name */}
                        <div>
                            <div className="text-3xl font-semibold">
                                Food Name
                            </div>
                            <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                                <input type="text" placeholder="Food Name"  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4`} {...register("name")}/>
                                <div onClick={()=>{
                                    resetName()
                                }}>
                                    <img src={no} alt="" className='mx-3' width="30px"/>
                                </div>
                            </div>
                        </div>
                        {/* Food Desc */}
                        <div className="my-10">
                            <div className="text-3xl font-semibold">
                                Description
                            </div>
                            <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-4 mt-4 items-center justify-center'>
                                <textarea placeholder="Description" cols="30" rows="10" className={`w-full max-w-s items-center bg-transparent border-none outline-none px-4`} {...register("desc")}></textarea>
                                <div onClick={()=>{
                                    resetDesc()
                                }}>
                                    <img src={no} alt="" className='mx-3' width="30px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5">
                        {/* Upload Image */}
                        <div>
                            <div className="text-3xl font-semibold">
                                Upload Image
                            </div>
                            <div className="mt-4">
                                asdasasd
                            </div>
                        </div>
                        {/* Nutrition */}
                        <div className="my-10">
                            <div className="text-3xl font-semibold">
                                Nutrition
                            </div>
                            <div className="bg-gray-200 flex flex-col rounded-xl mt-4 py-3">
                                <div className=" flex flex-row justify-between px-12 py-3">
                                    <div className="w-1/3">
                                        <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between">
                                            <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"} {...register("calories")}/>
                                            <span className="text-xl font-semibold">Kcal</span>
                                        </div>
                                        <div className="text-xl font-semibold text-center py-2">Calories</div>
                                    </div>
                                    <div className="w-1/3">
                                        <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between w-full">
                                            <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"}  {...register("carbo")}/>
                                            <span className="text-xl font-semibold">g</span>
                                        </div>
                                        <div className="text-xl font-semibold text-center py-2">Carbo</div>
                                    </div>
                                </div>
                                <div className=" flex flex-row justify-between px-12 py-3">
                                    <div className="w-1/3">
                                        <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between">
                                            <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"}  {...register("protein")} />
                                            <span className="text-xl font-semibold">g</span>
                                        </div>
                                        <div className="text-xl font-semibold text-center py-2">Protein</div>
                                    </div>
                                    <div className="w-1/3">
                                        <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between w-full">
                                            <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"} {...register("fat")}/>
                                            <span className="text-xl font-semibold">g</span>
                                        </div>
                                        <div className="text-xl font-semibold text-center py-2">Fat</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-300 px-6 py-2 rounded-xl font-semibold text-xl w-full">
                            Save                
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddRecipe;