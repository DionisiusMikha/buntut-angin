import {useNavigate} from "react-router-dom";
import rate from "/icon/rate.png";
import like from "/icon/like.png";
import comment from "/icon/comment.png";

function Card({recipe, index}) {
    console.log(recipe)
    const navigate = useNavigate();
    return (
        <>
            {index %2 == 0 && 
            <div className='bg-yellow-200 rounded-3xl py-5 px-5 mt-3 items-center flex'>
            <div className='flex flex-row items-center'>
                <img src={`http://localhost:3000${recipe.image}`} alt="" className='-ms-24 me-5'
                style={{
                    borderRadius: "50%",
                    height: "180px",
                    width: "180px",
                }}/>
                <div>
                    <div className='text-3xl font-semibold'>{recipe.name}</div>
                    <div className='text-lg font-medium'>{recipe.description}</div>
                    <div className="bg-white p-3 rounded-xl flex flex-row items-center w-fit justify-center px-4 mt-5">
                        <div className="flex flex-row items-center">
                            <img src={like} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{recipe.like}</span>
                        </div>
                        <div className="flex flex-row items-center mx-7">
                            <img src={rate} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{recipe.rating}</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={comment} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{recipe.jumlah}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>    
            </div>
        </div>}
            {index %2 == 1 && 
            <div className='bg-yellow-200 rounded-3xl py-5 px-5 mt-3 items-center flex'>
            <div className='flex flex-row items-center'>
                <div>
                    <div className='text-3xl font-semibold'>{recipe.name}</div>
                    <div className='text-lg font-medium'>{recipe.description}</div>
                    <div className="bg-white p-3 rounded-xl flex flex-row items-center w-fit justify-center px-4 mt-5">
                        <div className="flex flex-row items-center">
                            <img src={like} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{recipe.like}</span>
                        </div>
                        <div className="flex flex-row items-center mx-7">
                            <img src={rate} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{recipe.rating}</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={comment} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{recipe.jumlahd}</span>
                        </div>
                    </div>
                </div>
                <img src={`http://localhost:3000${recipe.image}`} alt="" 
                style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px",
                }}/>
            </div>
            <div>    
            </div>
        </div>}
        </>
    )
}

export default Card;