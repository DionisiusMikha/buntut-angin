import {useNavigate} from "react-router-dom";

function Card({item}) {
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full h-[24rem] bg-green-100 py-2 px-10 rounded-lg flex flex-col items-center" onClick={()=>{
                navigate(`/admin/recipes/${item.id}`);
            }}>
                <div>
                    <img src={item.image} alt="" width={"200px"} />
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