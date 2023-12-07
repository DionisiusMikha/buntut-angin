import { useForm } from "react-hook-form";
import no from '/icon/no.png'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useDispatch, useSelector } from "react-redux"
import { addRecipe } from "../../../Redux/recipesSlice";
import adminService from "../../../Services/Admin/admin";
import { useEffect, useState } from "react";

function EditRecipe1(props){
    const dispatch = useDispatch();
    const hasil = useSelector((state) => state.recipes.recipe);
    const [currImg, setCurrImg] = useState(`http://localhost:3000`+hasil[0].image);
    const {register, handleSubmit, reset, formState: { errors }  } = useForm({
        values: {
            name: hasil[0]?.name,
            desc: hasil[0]?.desc,
            calories: hasil[0]?.calories,
            carbo: hasil[0]?.carbo,
            protein: hasil[0]?.protein,
            fat: hasil[0]?.fat,
            image: hasil[0]?.image,
        },
    });

    const change = async data => {
        let path = ""
        if (typeof data.image != "string"){
            // ambil path img nya
            const formData = new FormData();
            formData.append("file", data.image[0]);
            const res = await adminService.uploadImage(formData, data.name);    
            path = "/assets/" + res.data.filename;
        } else {
            path = data.image
        }
        
        const recipe = {
            name : data.name,
            desc  : data.desc,
            image : path,
            calories : data.calories,
            carbo : data.carbo,
            protein : data.protein, 
            fat : data.fat,
        }

        try{
            dispatch(addRecipe(recipe))
            props.setActive(2);
        }catch(e){
          alert(e.message)
        }
    }

    const resetName = () =>{
        reset({ name: "" })
    }
    const resetDesc = () =>{
        reset({ desc: "" })
    }
    return (
        <form className="flex flex-row justify-between" onSubmit={handleSubmit(change)}>
            <div className="w-2/5">
                {/* Food Name */}
                <div className="h-36">
                    <div className="text-3xl font-semibold">
                        Food Name
                    </div>
                    <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                        <input type="text" placeholder="Food Name"  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4`} {...register("name", {
                            required:  "food name required"
                        })}/>
                        <div onClick={()=>{
                            resetName()
                        }}>
                            <img src={no} alt="" className='mx-3' width="30px"/>
                        </div>
                    </div>
                    {errors.name && <span style={{ color:"red" }}>{errors.name.message}</span>}
                </div>
                {/* Food Desc */}
                <div className="my-10">
                    <div className="text-3xl font-semibold">
                        Description
                    </div>
                    <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-4 mt-4 items-center justify-center'>
                        <textarea placeholder="Description" cols="30" rows="10" className={`w-full max-w-s items-center bg-transparent border-none outline-none px-4`} {...register("desc", {
                            required: "description required"
                        })}></textarea>
                        <div onClick={()=>{
                            resetDesc()
                        }}>
                            <img src={no} alt="" className='mx-3' width="30px"/>
                        </div>
                    </div>
                    {errors.desc && <span style={{ color:"red" }}>{errors.desc.message}</span>}
                </div>
            </div>
            <div className="w-2/5">
                {/* Upload Image */}
                <div className="">
                    <div className="text-3xl font-semibold">
                        Upload Image
                    </div>  
                    <div className="flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center justify-center">
                        <input type="file" accept="image/*" {...register("image")} className={`w-full h-12 max-w-s bg-transparent border-none outline-none px-4 py-auto`} onChange={(e)=>{
                            setCurrImg(URL.createObjectURL(e.target.files[0]));
                        }}/>
                    </div>
                    {errors.image && <span style={{ color:"red" }}>{errors.image.message}</span>}

                    <div className="flex flex-row mt-3 items-center">
                        <span className="me-7 text-xl font-semibold">Current Image : </span>
                        <img src={currImg} alt="" style={{
                            "borderRadius":"50%",
                            "height": "150px",
                            "width": "150px",
                        }}/>
                    </div>
                </div>
                {/* Nutrition */}
                <div className="my-2">
                    <div className="text-3xl font-semibold">
                        Nutrition
                    </div>
                    <div className="bg-gray-200 flex flex-col rounded-xl mt-2 py-3">
                        <div className=" flex flex-row justify-between px-12">
                            <div className="w-1/3 h-24">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"} {...register("calories", {required: "calories required"})}/>
                                    <span className="text-xl font-semibold">Kcal</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Calories</div>
                                {errors.calories && <span style={{ color:"red" }}>{errors.calories.message}</span>}
                            </div>
                            <div className="w-1/3 h-24">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between w-full">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"}  {...register("carbo", { required: "carbo required" })}/>
                                    <span className="text-xl font-semibold">g</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Carbo</div>
                                {errors.carbo && <span style={{ color:"red" }}>{errors.carbo.message}</span>}
                            </div>
                        </div>
                        <div className=" flex flex-row justify-between px-12">
                            <div className="w-1/3 h-24">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"}  {...register("protein", {
                                    required: "protein required"
                                })} />
                                    <span className="text-xl font-semibold">g</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Protein</div>
                                {errors.protein && <span style={{ color:"red" }}>{errors.protein.message}</span>}
                            </div>
                            <div className="w-1/3 h-24">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between w-full">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"} {...register("fat", {
                                    required: "fat required"
                                })}/>
                                    <span className="text-xl font-semibold">g</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Fat</div>
                                {errors.fat && <span style={{ color:"red" }}>{errors.fat.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end w-full mt-10">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72">
                        Next                
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditRecipe1;