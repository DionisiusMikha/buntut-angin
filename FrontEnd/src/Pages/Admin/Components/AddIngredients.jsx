import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { addIngredients } from "../../../Redux/recipesSlice";
import { useState } from "react";

function AddIngredients(props){
    const {register, handleSubmit, reset, formState: { errors }  } = useForm();

    const change = (e) =>{
        console.log(e);
        // try {
        //     addIngredients(e)
        // } catch (e) {
        //     alert(e.message);
        // }
    }
    return(
        <form className="container flex fle xx-row mt-5" onChange={handleSubmit(change)}>
            <input type="text" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5 w-3/5" placeholder="Name" {...register("name")} />
            <input type="number" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5 w-1/6" placeholder="qty" {...register("qty")}/>
            <select name="" id="" className="bg-gray-200 py-2 w-1/6 rounded-lg text-lg me-5" {...register("unit")}>
                <option value="gram">gram</option>
                <option value="ml">ml</option>
                <option value="butir">butir</option>
                <option value="sdm">sdm</option>
                <option value="sdt">sdt</option>
                <option value="cc">cc</option>
            </select>
            <button className="bg-red-300 py-2 px-4 rounded-lg" onClick={()=>{
                props.deleteHandler(props.id)
            }}>Delete</button>
        </form>
    )
}

export default AddIngredients;