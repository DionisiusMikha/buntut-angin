import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddRecipe1 from "./recipes1";
import AddRecipe2 from "./recipes2";

function AddRecipe(){
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    return(
        <>
        <div className="mt-10 mr-10 ml-10 mx-5">
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
            <div className="bg-white rounded-xl px-10 py-10 min-h-[calc(100vh-9rem)] drop-shadow-lg">
                {/* STEPS */}
                <div className="flex flex-row justify-center items-center mb-4">
                    <div className={` px-4 py-2 rounded-full ${active == 1 ? "bg-blue-200 font-bold" : "bg-gray-100"}`} onClick={()=>{
                        setActive(1);
                    }}>1</div>
                    <hr className="w-32 border-4"/>
                    <div className={` px-4 py-2 rounded-full ${active == 2 ? "bg-blue-200 font-bold" : "bg-gray-100"}`} onClick={()=>{
                        setActive(2);
                    }}>2</div>
                    <hr className="w-32 border-4"/>
                    <div className={` px-4 py-2 rounded-full ${active == 3 ? "bg-blue-200 font-bold" : "bg-gray-100"}`} onClick={()=>{
                        setActive(3);
                    }}>3</div>
                </div>

                {active == 1  && <AddRecipe1 setActive={setActive}/>}
                {active == 2  && <AddRecipe2 setActive={setActive}/>}
                {active == 3  && <AddRecipe1 setActive={setActive}/>}
            </div>
        </div>
        </>
    )
}

export default AddRecipe;