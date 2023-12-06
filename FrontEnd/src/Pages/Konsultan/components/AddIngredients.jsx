import { useForm } from "react-hook-form";
import { addIngredients } from "../../../Redux/recipesSlice";
import { useState } from "react";

function AddIngredients(props){
    const [name, setName] = (props.bahan.name != "" ? useState(props.bahan.name): useState(""));
    const [qty, setQty] = (props.bahan.qty != "" ? useState(props.bahan.qty): useState(0));
    const [unit, setUnit] = (props.bahan.unit != "" ? useState(props.bahan.uom): useState("gram")); 

    return(
        <div className="container flex flex-row mt-5" onBlur={()=>{
            props.saveAll(props.id, name, unit, qty)
        }}>
            <input type="text" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5 w-3/5" placeholder="Name" value={name} onChange={(e)=>{
                setName(e.target.value)
            }}/>
            <input type="number" className="bg-gray-200 py-2 px-3 rounded-lg text-lg me-5 w-1/6" min={0} placeholder="qty" value={qty} onChange={(e)=>{
                setQty(e.target.value)  
            }}/>
            <select name="" id="" className="bg-gray-200 py-2 w-1/6 rounded-lg text-lg me-5" value={unit} onChange={(e)=>{
                setUnit(e.target.value)
            }}>
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
        </div>
    )
}

export default AddIngredients;