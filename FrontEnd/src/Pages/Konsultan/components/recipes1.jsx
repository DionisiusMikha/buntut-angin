import { useForm } from "react-hook-form";
import no from '/icon/no.png'
import Joi from 'joi'
import { useDispatch, useSelector } from "react-redux"
import { addRecipe } from "../../../Redux/recipesSlice";

function AddRecipe1(props){
    const dispatch = useDispatch();
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
        // resolver: joiResolver(schema)
    });

    const change = async data => {
        // console.log(data);
        try{
            dispatch(addRecipe(data))
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
        <form className="flex flex-row justify-between"
         onSubmit={handleSubmit(change)}
        //  onChange={handleSubmit(change)}
         >
            <div className="w-2/5">
                {/* Food Name */}
                <div>
                    <div className="text-3xl font-semibold">
                        Food Name
                    </div>
                    <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center'>
                        <input type="text" placeholder="Food Name"  className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4`} {...register("name", {
                            required: {
                                message: "food name tidak boleh kosong"
                            }
                        })}/>
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
                        <textarea placeholder="Description" cols="30" rows="10" className={`w-full max-w-s items-center bg-transparent border-none outline-none px-4`} {...register("desc", {
                            required: {
                                message: "description tidak boleh kosong"
                            }
                        })}></textarea>
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
                    <div className="flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-4 items-center justify-center">
                        <input type="file" {...register("image")} className={`w-full h-12 max-w-s bg-transparent border-none outline-none px-4 py-auto`}/>
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
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"} {...register("calories", {
                                    required: {
                                        message: "calories tidak boleh kosong"
                                    }
                                    })}/>
                                    <span className="text-xl font-semibold">Kcal</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Calories</div>
                            </div>
                            <div className="w-1/3">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between w-full">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"}  {...register("carbo", {
                                    required: {
                                        message: "carbo tidak boleh kosong"
                                    }
                                    })}/>
                                    <span className="text-xl font-semibold">g</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Carbo</div>
                            </div>
                        </div>
                        <div className=" flex flex-row justify-between px-12 py-3">
                            <div className="w-1/3">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"}  {...register("protein", {
                                    required: {
                                        message: "protein tidak boleh kosong"
                                    }
                                })} />
                                    <span className="text-xl font-semibold">g</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Protein</div>
                            </div>
                            <div className="w-1/3">
                                <div className="bg-gray-100 px-5 py-2 rounded-lg flex flex-row justify-between w-full">
                                    <input type="number"  className="bg-transparent border-none outline-none text-xl font-semibold w-2/3" min={"0"} {...register("fat", {
                                    required: {
                                        message: "fat tidak boleh kosong"
                                    }
                                })}/>
                                    <span className="text-xl font-semibold">g</span>
                                </div>
                                <div className="text-xl font-semibold text-center py-2">Fat</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end w-full mt-40">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" 
                    // onClick={()=>{
                    //     try{
                    //         dispatch(addRecipe(data))
                    //         props.setActive(2);
                    //     }catch(e){
                    //       alert(e.message)
                    //     }
                        
                    // }}
                    >
                        Next                
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddRecipe1;