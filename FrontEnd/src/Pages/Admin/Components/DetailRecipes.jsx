import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom"
import kuraSenam from "/img/kuroSenam.png";
import kuro from "/img/kuro.png";
import rate from "/icon/rate.png";
import like from "/icon/like.png";
import comment from "/icon/comment.png";
import adminService from "../../../Services/Admin/admin"
import { useDispatch, useSelector } from "react-redux"
import { addRecipe, addIngredients,addSteps } from "../../../Redux/recipesSlice";
import Comments from "./Comments";

function DetailRecipes() {
    const [comments, setComments] = useState([]);
    const [bahan , setBahan] = useState([]);
    const [steps , setSteps] = useState([]);
    const [recipe, setRecipe] = useState({});
    const dispatch = useDispatch();

    const id = window.location.pathname.split("/")[3];
    const cariData = async () => {
        const res = await adminService.getRecipeById(id)
        setRecipe(res.data[0]);
    
        let langkah = JSON.parse(res.data[0].steps)
        setSteps(langkah);

        let bahanName = JSON.parse(res.data[0].ingredients[0].name)
        let bahanQty = JSON.parse(res.data[0].ingredients[0].qty)
        let bahanUom = JSON.parse(res.data[0].ingredients[0].uom)

        let bahan2 = [];
        for(let i=0; i<bahanName.length; i++){
            bahan2.push({
                name : bahanName[i],
                qty : bahanQty[i],
                uom : bahanUom[i]
            })
        }
        setBahan(bahan2)

        if (res.data[0].comments == null){
            setComments([]);
        } else {
            let com = JSON.parse(res.data[0].comments)
            setComments(com);
        }
    }

    useEffect(() => {
        cariData();
    }, [])

    const url = "http://localhost:3000" + recipe.image;

    const navigate = useNavigate();
    return (
        <>
            {/* semi navbar */}
            <div className="flex flex-row justify-between pb-6">
                <div className="text-4xl font-semibold">Detail Recipes</div>
                <div>
                    <button className="bg-blue-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                        navigate(`/admin/recipes/${id}/edit`);
                        try{
                            dispatch(addRecipe(recipe))
                            dispatch(addIngredients(bahan))
                            dispatch(addSteps(steps))
                        } catch(e) {
                            alert(e.message);
                        }
                    }}>edit</button>
                    <button className="bg-red-300 px-6 py-2 rounded-xl font-semibold text-xl me-5" onClick={()=>{
                        navigate(-1);
                    }}>back</button>
                </div>
            </div>
            {/* DETAIL */}
            <div className="bg-orange-100 rounded-xl px-10 py-10 flex flex-row justify-between w-11/12">
                <div className="w-5/6 flex flex-col justify-center">
                    <div className="text-5xl font-semibold">{recipe.name}</div>
                    <div className="text-3xl py-8 leading-relaxed">{recipe.desc}</div>
                    <div className="bg-white p-3 rounded-xl flex flex-row items-center w-1/3 justify-center mt-10">
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
                            <span className="text-2xl font-semibold px-2">{comments.length}</span>
                        </div>
                    </div>
                </div>
                <div className="-me-40 flex justify-start items-center">
                    {recipe.image ? (
                        <img src={url} alt="" className="w-60 h-60 rounded-full"/>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            {/* Nutrition */}
            <div className="bg-emerald-200 w-11/12 my-12 rounded-xl px-10 py-10">
                <div className="text-5xl font-semibold">Nutrition Facts</div>
                <div className="grid gap-16 grid-cols-6 mt-5">
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{recipe.calories}</div>
                        <div className="text-2xl font-semibold mt-4">Calories</div>
                        <div className="text-xl text-gray-500">Kcal</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{recipe.carbo}</div>
                        <div className="text-2xl font-semibold mt-4">Carbo</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{recipe.protein}</div>
                        <div className="text-2xl font-semibold mt-4">Protein</div>
                        <div className="text-xl text-gray-500">g</div>
                    </div>
                    <div className="bg-yellow-100 flex flex-col rounded-full items-center justify-center px-5 drop-shadow-xl">
                        <div className="text-2xl font-semibold bg-white rounded-full p-5">{recipe.fat}</div>
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
                            {bahan.map((i)=>{
                                return <li className="text-2xl py-2 font-semibold ">
                                    {i.name} - {i.qty} - {i.uom}
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="w-1/2">
                        <div className="text-5xl font-semibold">Steps</div>
                        <ul className="mt-5 ms-7 list-decimal">
                            {steps.map((i)=>{
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
                <div className="py-5">
                    {comments.length == 0 && <div className="text-2xl font-semibold text-center py-5">THERE IS NO COMMENT ABOUT THIS FOOD</div>}
                    
                    {comments.map((c, idx)=>{
                        return (
                            <Comments key={idx} comment={c}></Comments>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DetailRecipes;