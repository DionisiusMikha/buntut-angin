import {useState, useEffect} from 'react';
import Card from "./Card";
import { useLoaderData, useNavigate } from "react-router-dom"
import adminService from '../../../Services/Admin/admin';
import dietisianService from '../../../Services/Dietisian/dietisian';
import kuro from '/img/kuro.png';
import rate from "/icon/rate.png";
import like from "/icon/like.png";
import comment from "/icon/comment.png";

function ListRecipes (){
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [topRecipe1, setTopRecipe1] = useState([]);
    const [topRecipe2, setTopRecipe2] = useState([]);
    const [topRecipe3, setTopRecipe3] = useState([]);
    const [comments1, setComments1] = useState([]);
    const [comments2, setComments2] = useState([]);
    const [comments3, setComments3] = useState([]);
    const [userLogin, setUserLogin] = useState({});
    const navigate = useNavigate();

    const getTop3 = async () =>{
        const allRecipes = await adminService.getTop3();
        setTopRecipe1(allRecipes.data.data[0])
        setTopRecipe2(allRecipes.data.data[1])
        setTopRecipe3(allRecipes.data.data[2])
        if (allRecipes.data.data[0].comments == null){
            setComments1([]);
        } else {
            let com = JSON.parse(res.data.comments)
            setComments1(com);
        }
        if (allRecipes.data.data[1].comments == null){
            setComments2([]);
        } else {
            let com = JSON.parse(res.data.comments)
            setComments2(com);
        }
        if (allRecipes.data.data[2].comments == null){
            setComments3([]);
        } else {
            let com = JSON.parse(res.data.comments)
            setComments3(com);
        }
    }

    const next = () => {
        setPage(page + 1);
    }

    const prev = () => {
        if(page - 1 > 0){
            setPage(page - 1);
        }
    }

    const getAllRecipes = async () =>{
        const allRecipes = await dietisianService.getAllRecipes(page, search);
        setRecipes(allRecipes.data);
    }

    useEffect(()=>{
        getTop3();
    }, [])

    useEffect(() => {
        getAllRecipes();
    }, [page, search])

    return(
        <>
            <div className='px-10 py-10 w-full'>
                {page == 1 && 
                    <div className="w-full h-full bg-green-200 rounded-3xl flex px-16 py-10">
                        <div className="w-3/4 flex flex-col items-start justify-center px-8 gap-y-8">
                            <h1 className="text-7xl font-semibold">Cook New Dishes</h1>
                            <h1 className="text-5xl">Like Never Before</h1>
                        </div>
                        <div className="w-1/2  h-full flex justify-center items-center">
                            <img src={kuro} width={"65%"}/>
                        </div>
                    </div>
                }
                {/* top 3 */}
                {page == 1 ? (
                    <div className='flex flex-row items-center justify-between my-10'>
                        {/* kiri */}
                        <div className='bg-orange-200 w-1/2 rounded-3xl py-5 px-5 me-14 flex flex-col justify-center h-[34rem]' onClick={()=>{
                            navigate(`/dietisian/recipes/${topRecipe1.recipe_id}`)
                        }}>
                            <div className='text-3xl font-semibold'>{topRecipe1.name}</div>
                            <div className='flex flex-row items-center'>
                                <div className='text-lg font-medium'>{topRecipe1.description}</div>
                                <img src={`http://localhost:3000${topRecipe1.image}`} alt="" 
                                style={{
                                    borderRadius: "50%",
                                    height: "250px",
                                    width: "250px",
                                }}/>
                            </div>
                            <div className="bg-white p-3 rounded-xl flex flex-row items-center w-fit justify-center mt-10 px-4">
                                <div className="flex flex-row items-center">
                                    <img src={like} alt="" width={"30px"} />
                                    <span className="text-2xl font-semibold px-2">{topRecipe1.like}</span>
                                </div>
                                <div className="flex flex-row items-center mx-7">
                                    <img src={rate} alt="" width={"30px"} />
                                    <span className="text-2xl font-semibold px-2">{topRecipe1.rating}</span>
                                </div>
                                <div className="flex flex-row items-center">
                                    <img src={comment} alt="" width={"30px"} />
                                    <span className="text-2xl font-semibold px-2">{comments1.length}</span>
                                </div>
                            </div>
                        </div>
                        {/* kanan */}
                        <div className='flex flex-col w-1/2 ms-14 h-[34rem]'>
                            <div className='h-1/2 bg-blue-200 w-full rounded-3xl py-5 px-5 mb-3 items-center flex' onClick={()=>{
                                navigate(`/dietisian/recipes/${topRecipe2.recipe_id}`)
                            }}>
                                <div className='flex flex-row items-center'>
                                    <img src={`http://localhost:3000${topRecipe2.image}`} alt="" className='-ms-24 me-5' style={{
                                            borderRadius: "50%",
                                            height: "180px",
                                            width: "180px",
                                        }}/>
                                    <div>
                                        <div className='text-3xl font-semibold'>{topRecipe2.name}</div>
                                        <div className='text-lg font-medium'>{topRecipe2.description}</div>
                                        <div className="bg-white p-3 rounded-xl flex flex-row items-center w-fit justify-center px-4 mt-5">
                                            <div className="flex flex-row items-center">
                                                <img src={like} alt="" width={"30px"} />
                                                <span className="text-2xl font-semibold px-2">{topRecipe2.like}</span>
                                            </div>
                                            <div className="flex flex-row items-center mx-7">
                                                <img src={rate} alt="" width={"30px"} />
                                                <span className="text-2xl font-semibold px-2">{topRecipe2.rating}</span>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <img src={comment} alt="" width={"30px"} />
                                                <span className="text-2xl font-semibold px-2">{comments2.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-1/2 w-full bg-yellow-200 rounded-3xl py-5 px-5 mt-3 items-center flex' onClick={()=>{
                                navigate(`/dietisian/recipes/${topRecipe3.recipe_id}`)
                            }}>
                                <div className='flex flex-row items-center'>
                                    <img src={`http://localhost:3000${topRecipe3.image}`} alt="" className='-ms-24 me-5' style={{
                                        borderRadius: "50%",
                                        height: "180px",
                                        width: "180px",
                                    }}/>
                                    <div>
                                        <div className='text-3xl font-semibold'>{topRecipe3.name}</div>
                                        <div className='text-lg font-medium'>{topRecipe3.description}</div>
                                        <div className="bg-white p-3 rounded-xl flex flex-row items-center w-fit justify-center px-4 mt-5">
                                            <div className="flex flex-row items-center">
                                                <img src={like} alt="" width={"30px"} />
                                                <span className="text-2xl font-semibold px-2">{topRecipe3.like}</span>
                                            </div>
                                            <div className="flex flex-row items-center mx-7">
                                                <img src={rate} alt="" width={"30px"} />
                                                <span className="text-2xl font-semibold px-2">{topRecipe3.rating}</span>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <img src={comment} alt="" width={"30px"} />
                                                <span className="text-2xl font-semibold px-2">{comments3.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                {page == 1 && <div className="text-4xl text-center font-semibold">Try Another Recipes</div>}
                <div key={1} className='grid grid-cols-2 gap-x-24 gap-y-10 mb-16'>
                    {recipes.map((recipe, index)=>{
                        return(
                            <>
                                <Card recipe={recipe} index={index} key={index} />
                            </>
                        )
                    })}
                </div>
                <div className='w-9/12 h-24 flex justify-center items-center fixed bottom-0 ms-10 mb-4 opacity-80'>
                    <button className='w-20 h-1/2 text-3xl bg-white rounded-l hover:opacity-75' onClick={prev}>Prev</button>
                    <div className='w-16 h-1/2 text-3xl flex justify-center items-center bg-white'>
                        <p className='text-3xl' readonly>{page}</p>
                    </div>
                    <button className='w-20 h-1/2 text-3xl bg-white rounded-r hover:opacity-75' onClick={next}>Next</button>
                </div>
            </div>
        </>
    )
}

export default ListRecipes;