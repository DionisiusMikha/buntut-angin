import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addIngredients } from "../../../Redux/recipesSlice";
import AddIngredients from "./AddIngredients";

function AddRecipe2(props){
    const hasil = useSelector((state) => state.recipes.ingredients);
    const dispatch = useDispatch();
    const [bahan, setbahan] = (hasil != "" ? useState(hasil): useState([{
        name : "",
        qty: 0,
        uom: "gram"
    }]));
    function deleteHandler(idx){
        const x = bahan.filter((b, i)=> {
            if(i != idx){
                return b
            }
        })
        setbahan(x);
    }

    function saveAll(id, name, uom, qty){
        console.log(id, name, uom, qty)
        const newBahan = [...bahan]
        newBahan[id].name = name
        newBahan[id].qty = qty
        newBahan[id].uom = uom
        setbahan(newBahan)   
    }

    function save(){
        try{
            dispatch(addIngredients(bahan))
        } catch(err){
            console.log(err)
            alert(err.message)
        }
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-full">
                <div className="min-h-[calc(100vh-21rem)]">
                    <div className="flex justify-between ">
                        <div className="text-2xl font-semibold py-1"> Ingredients </div>
                        <button className="bg-indigo-200 px-4 py-2 rounded-xl text-lg font-semibold" onClick={()=>{
                            setbahan([...bahan, {
                                name : "",
                                qty: 0,
                                uom: "gram"
                            }])
                        }}>
                            Add Ingredients
                        </button>
                    </div>
                    <div className="overflow-auto">
                        {bahan.map((item, index)=>{
                            const x = Math.random();
                            return <AddIngredients key={x} id={index} bahan={item} deleteHandler={deleteHandler} saveAll={saveAll}/>
                        })}
                    </div>
                </div>
                {/* button */}
                <div className="flex flex-row justify-between">
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" onClick={()=>{
                        save()
                        props.setActive(1);
                    }}>
                        Previous                
                    </button>
                    <button type="submit" className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-xl w-72" onClick={()=>{
                        save()
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