import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addSteps } from "../../../Redux/recipesSlice";
import AddStep from "./AddStep";

function AddRecipe3(props){
    const hasil = useSelector((state) => state.recipes.steps);
    const dispatch = useDispatch();
    if (hasil.length > 0){
        console.log(hasil)
    }
    const  [steps, setsteps] = useState([""]);

    function deleteHandler(idx){
        const newStep = [...steps]
        newStep.splice(idx, 1)
        setsteps(newStep)
    }

    function saveAll(id,step){
        const newStep = [...steps]
        newStep[id] = step
        setsteps(newStep)   
        console.log(steps)
    }

    function save(){
        try{
            dispatch(addSteps(steps))
        } catch(err){
            console.log(err)
            alert(err.message)
        }

        // save to db
        // const response = await 
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

export default AddRecipe3;