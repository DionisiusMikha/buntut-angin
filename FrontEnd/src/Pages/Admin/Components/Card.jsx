import {useNavigate} from "react-router-dom";
// require("dotenv").config();
import gbr from "../../../../../Uploads/Recipes/file-1701755223941-675916062.png";

function Card({item}) {
    const navigate = useNavigate();
    const url = "http://localhost:3000" + item.image
    return (
        <>
            <div className="w-full h-[24rem] bg-green-100 py-2 px-10 rounded-lg flex flex-col items-center justify-center" onClick={()=>{
                navigate(`/admin/recipes/${item.recipe_id}`);
            }}>
                <div className="rounded-full">
                    <img src={url} alt="" width={"200px"} style={{
                        borderRadius: "50%",
                        height: "200px",
                    }}/>
                </div>
                <div className="font-semibold text-2xl py-2">
                    {item.name}
                </div>
                <div className="py-1 text-lg text-center ">
                    {item.description}
                </div>
            </div>
        </>
    )
}

export default Card;