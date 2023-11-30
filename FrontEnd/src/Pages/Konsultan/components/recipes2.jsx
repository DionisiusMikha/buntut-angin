import { useForm } from "react-hook-form";
import no from '/icon/no.png'
import Joi from 'joi'
import { joiResolver } from "@hookform/resolvers/joi"
import { useState } from "react";
import AddIngredients from "./ingridients";

function AddRecipe2(props){
    const [bahan, setbahan] = useState([{
            id : 0, 
            name: "",
            amount: "",
            unit: ""
        }
    ])

    function deleteHandler(idx){
        const x = bahan.filter((b, i)=> {
            if(i != idx){
                return b
            }
        })
        setbahan(x);
    }

    function saveAll(id, name, qty, unit){

    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-full">
                <div className="min-h-[calc(100vh-21rem)]">
                    <div className="flex justify-end ">
                        <button className="bg-indigo-200 px-4 py-2 rounded-xl text-lg font-semibold" onClick={()=>{
                            setbahan([...bahan, {
                                name : "",
                                amount: "",
                                unit: ""
                            }])
                        }}>
                            Add Ingredients
                        </button>
                    </div>
                    <div className="overflow-auto">
                        {bahan.map((item, index)=>{
                            const x = Math.random();
                            return <AddIngredients key={x} id={index} bahan={item} setbahan={setbahan} deleteHandler={deleteHandler} saveAll={saveAll}/>
                        })}
                    </div>
                </div>
                {/* button */}
                <div className="flex flex-row justify-between">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" onClick={()=>{
                        props.setActive(1);
                    }}>
                        Previous                
                    </button>
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" onClick={()=>{
                        props.setActive(3);
                    }}>
                        Next                
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddRecipe2;