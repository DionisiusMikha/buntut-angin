import {useNavigate} from "react-router-dom";

function Card({item}) {
    const navigate = useNavigate();
    const url = "http://localhost:3000" + item.image
    return (
        <>
            <div className="w-full h-[24rem] bg-green-100 py-2 px-10 rounded-lg flex flex-col items-center justify-center" onClick={()=>{
                navigate(`/admin/recipes/${item.recipe_id}`);
            }}>
                <div className="rounded-full">
                    {item.image ? (
                        <img src={url} alt="" width={"200px"} style={{borderRadius: "50%", height: "200px"}}/>
                    ) : (
                        <p className="w-36 h-36 bg-gray-200 flex justify-center items-center rounded-full text-gray-400">No Image</p>
                    )}
                </div>
                <div className="w-full h-1/2 flex flex-col justify-start items-center gap-y-2 pt-6">
                    <p className="font-semibold text-2xl">{item.name}</p>
                    <p className="py-1 text-lg text-center ">{item.description}</p>
                </div>
            </div>
        </>
    )
}

export default Card;