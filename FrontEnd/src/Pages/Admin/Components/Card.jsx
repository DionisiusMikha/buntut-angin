import {useNavigate} from "react-router-dom";
import gbr from "../../../../../Uploads/Recipes/file-1701755223941-675916062.png";

function Card({item}) {
    const navigate = useNavigate();
    const alamat = "../../../../." + item.image;

    return (
        <>
            <div className="w-full h-[24rem] bg-green-100 py-2 px-10 rounded-lg flex flex-col items-center py-8" onClick={()=>{
                navigate(`/admin/recipes/${item.recipe_id}`);
            }}>
                <div className="h-1/2 w-full flex justify-center items-center mt-6">
                    {item.image ? (
                        <img src={alamat} alt="Maem" className="w-32 h-32" />
                    ) : (
                        <p className="w-36 h-36 bg-gray-200 flex justify-center items-center rounded-full text-gray-400">No Image</p>
                    )}
                </div>
                <div className="w-full h-1/2 flex flex-col justify-start items-center gap-y-2 pt-6">
                    <p className="font-semibold text-2xl">{item.name}</p>
                    <p className="py-1 text-lg text-center ">{item.description}</p>
                </div>

                {/* <img src={require(alamat).default} alt="" /> */}
            </div>
        </>
    )
}

export default Card;