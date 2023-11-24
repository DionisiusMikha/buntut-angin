import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom"
import kuraSenam from "/img/kuroSenam.png";
import kuro from "/img/kuro.png";

function DetailRecipes() {
    // const [resep, setResep] = useState({});
    const data = useLoaderData();

    // useEffect(() => {
    //     cariData();
    // }, [])

    const navigate = useNavigate();
    return (
        <>
            {/* semi navbar */}
            <div className="flex flex-row justify-between pb-6">
                <div className="text-4xl font-semibold">Detail Recipes</div>
                <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                    navigate(-1);
                }}>back</button>
            </div>
            {/* DETAIL */}
            <div className="bg-orange-100 rounded-xl px-10 py-10 flex flex-row justify-between w-11/12">
                <div className="w-5/6 flex flex-col justify-center">
                    <div className="text-5xl font-semibold">{data.name}</div>
                    <div className="text-3xl py-8 leading-relaxed">{data.description}</div>
                </div>
                <div className="-me-48">
                    <img src={data.image} alt="" width={"300px"} />
                </div>
            </div>
            {/* Nutrion */}
            <div className="bg-emerald-200 w-11/12 my-12 rounded-xl px-10 py-10">
                <div className="text-5xl font-semibold">Nutrion Facts</div>
                <div className="grid gap-16 grid-cols-6 mt-5">
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrion.calories}</div>
                        <div className="text-2xl font-semibold mt-4">Calories</div>
                        <div className="text-xl text-gray-500">Kcal</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrion.carbo}</div>
                        <div className="text-2xl font-semibold mt-4">Carbo</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrion.protein}</div>
                        <div className="text-2xl font-semibold mt-4">Protein</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{data.nutrion.fat}</div>
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
            
        </>
    )
}

export default DetailRecipes;