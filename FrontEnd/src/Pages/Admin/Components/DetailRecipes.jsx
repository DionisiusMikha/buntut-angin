import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom"
import kuraSenam from "/img/kuroSenam.png";
import kuro from "/img/kuro.png";
import rate from "/icon/rate.png";
import like from "/icon/like.png";
import comment from "/icon/comment.png";

function DetailRecipes() {
    const data = useLoaderData();
    const [rating, setRating] = useState(0);

    const cariData = () => {
        let total = 0;
        data.comment.map(comment => {
            total += comment.rating;
        })
        setRating(total / data.comment.length);
    }

    useEffect(() => {
        cariData();
    }, [])

    const navigate = useNavigate();
    return (
        <>
            {/* semi navbar */}
            <div className="flex flex-row justify-between pb-6">
                <div className="text-4xl font-semibold">Detail Recipes</div>
                <div>
                    <button className="bg-blue-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                        navigate(`/admin/recipes/${data.id}/edit`);
                    }}>edit</button>
                    <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                        navigate(-1);
                    }}>back</button>
                </div>
            </div>
            {/* DETAIL */}
            <div className="bg-orange-100 rounded-xl px-10 py-10 flex flex-row justify-between w-11/12">
                <div className="w-5/6 flex flex-col justify-center">
                    <div className="text-5xl font-semibold">{data.name}</div>
                    <div className="text-3xl py-8 leading-relaxed">{data.description}</div>
                    <div className="bg-white p-3 rounded-xl flex flex-row items-center w-1/3 justify-center mt-10">
                        <div className="flex flex-row items-center">
                            <img src={like} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{data.like}</span>
                        </div>
                        <div className="flex flex-row items-center mx-7">
                            <img src={rate} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{rating}</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={comment} alt="" width={"30px"} />
                            <span className="text-2xl font-semibold px-2">{data.comment.length}</span>
                        </div>
                    </div>
                </div>
                <div className="-me-48">
                    <img src={data.image} alt="" width={"300px"} />
                </div>
            </div>
            {/* Nutrition */}
            <div className="bg-emerald-200 w-11/12 my-12 rounded-xl px-10 py-10">
                <div className="text-5xl font-semibold">Nutrition Facts</div>
                <div className="grid gap-16 grid-cols-6 mt-5">
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrition.calories}</div>
                        <div className="text-2xl font-semibold mt-4">Calories</div>
                        <div className="text-xl text-gray-500">Kcal</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrition.carbo}</div>
                        <div className="text-2xl font-semibold mt-4">Carbo</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrition.protein}</div>
                        <div className="text-2xl font-semibold mt-4">Protein</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrition.fat}</div>
                        <div className="text-2xl font-semibold mt-4">Fat</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="col-span-2 -m-6 flex flex-row justify-center">
                        <img src={kuraSenam} alt=""  />
                    </div>
                </div>
                <div className="flex flex-row mt-20">
                    <div className="w-2/5">
                        <div className="text-5xl font-semibold">Ingredients</div>
                        <ul className="mt-5 ms-7 list-disc">
                            {data.ingredients.map((i)=>{
                                return <li className="text-2xl py-2 font-semibold ">
                                    {i.name} {i.qty} {i.unit}
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="w-1/2">
                        <div className="text-5xl font-semibold">Steps</div>
                        <ul className="mt-5 ms-7 list-decimal">
                            {data.steps.map((i)=>{
                                return <li className="text-2xl py-2 font-semibold ">
                                    {i}
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="-me-48">
                        <img src={kuro} alt="" width={"350px"}/>
                    </div>
                </div>
            </div>
            {/* Comment */}
            <div className="bg-white w-11/12 drop-shadow-xl mb-5 p-10 rounded-xl">
                <div className="text-5xl font-semibold">Comments</div>
                <div>
                    {data.comment.map((c)=>{
                        return (
                            <>
                                <div className="py-3 flex flex-row">
                                    <div className="">
                                        <img src="" alt="a" width={"30px"}/>
                                    </div>
                                    <div className="text-black">
                                        <div className="font-semibold text-xl">@{c.username}</div>
                                        <div className="text-lg">{c.comment}</div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DetailRecipes;