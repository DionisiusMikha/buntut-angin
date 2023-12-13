import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditRecipe1 from "./EditRecipe1";
import EditRecipe2 from "./EditRecipe2";
import EditRecipe3 from "./EditRecipe3";


function EditRecipe(){
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    
    return(
        <>
            {/* semi navbar */}
            <div className="flex flex-row justify-between pb-6">
                <div className="text-4xl font-semibold">Edit Recipe</div>
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
                    <div className={` px-4 py-2 rounded-full text-xl ${active == 1 ? "bg-blue-200 font-bold" : "bg-gray-100"}`}>1</div>
                    <hr className="w-32 border-4"/>
                    <div className={` px-4 py-2 rounded-full text-xl ${active == 2 ? "bg-blue-200 font-bold" : "bg-gray-100"}`}>2</div>
                    <hr className="w-32 border-4"/>
                    <div className={` px-4 py-2 rounded-full text-xl ${active == 3 ? "bg-blue-200 font-bold" : "bg-gray-100"}`}>3</div>
                </div>

                {active == 1  && <EditRecipe1 setActive={setActive}/>}
                {active == 2  && <EditRecipe2 setActive={setActive}/>}
                {active == 3  && <EditRecipe3 setActive={setActive}/>}
            </div>
        </>
    )
}

export default EditRecipe;