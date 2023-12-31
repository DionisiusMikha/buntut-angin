import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addSteps } from "../../../Redux/recipesSlice";
import AddStep from "./AddStep";
import admin from "../../../Services/Admin/admin";
import {useNavigate} from "react-router-dom"

function EditRecipe3(props){
    const navigate = useNavigate()
    const hasil = useSelector((state) => state.recipes.steps);
    const dataStep = useSelector((state) => state.recipes.steps);
    const dataIngredients = useSelector((state) => state.recipes.ingredients);
    const dataR = useSelector((state) => state.recipes.recipe);
    const dispatch = useDispatch();
    const  [steps, setsteps] = (hasil.length == 0 ? useState([""]) : useState(hasil))
    const id = window.location.pathname.split("/")[3];

    function deleteHandler(idx){
        const newStep = [...steps]
        newStep.splice(idx, 1)
        setsteps(newStep)
    }

    function saveAll(id,step){
        const newStep = [...steps]
        newStep[id] = step
        setsteps(newStep)   
    }

    async function save(){
        
        try{
            dispatch(addSteps(steps))
        } catch(err){
            console.log(err)
            alert(err.message)
        }

        let ingredientsName = [];
        for(let i = 0; i < dataIngredients.length; i++){
            ingredientsName.push(dataIngredients[i].name)
        }
        let ingredientsQty = [];
        for(let i = 0; i < dataIngredients.length; i++){
            ingredientsQty.push(dataIngredients[i].qty)
        }
        let ingredientsUom = [];
        for(let i = 0; i < dataIngredients.length; i++){
            ingredientsUom.push(dataIngredients[i].uom)
        }
        
        let bahanName = JSON.stringify(ingredientsName)
        let bahanQty = JSON.stringify(ingredientsQty)
        let bahanUom = JSON.stringify(ingredientsUom)
        let langkah = JSON.stringify(steps)

        // save to db
        const res = await admin.updateRecipe(dataR[0].name, dataR[0].desc, dataR[0].image, bahanName, bahanQty, bahanUom, langkah, dataR[0].calories,dataR[0].carbo,dataR[0].protein,dataR[0].fat, id)
        // console.log(res)
        if (res.status == 201){
            navigate("/admin/recipes")
        }
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-full">
                <div className="min-h-[calc(100vh-21rem)]">
                    <div className="flex justify-between ">
                        <div className="text-2xl font-semibold py-1"> Steps </div>
                        <button className="bg-indigo-200 px-4 py-2 rounded-xl text-lg font-semibold" onClick={()=>{
                            setsteps([...steps, ""])
                        }}>
                            Add Steps
                        </button>
                    </div>
                    <div className="overflow-auto">
                        {steps.map((item, index)=>{
                            const x = Math.random();
                            // console.log(index)
                            return <AddStep key={x} id={index} steps={item} deleteHandler={deleteHandler} saveAll={saveAll}/>
                        })}
                    </div>
                </div>
                {/* button */}
                <div className="flex flex-row justify-between">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" onClick={()=>{
                        save()
                        props.setActive(2);
                    }}>
                        Previous                
                    </button>
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" onClick={()=>{
                        save()
                        // props.setActive(3);
                    }}>
                        Finish                
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditRecipe3;