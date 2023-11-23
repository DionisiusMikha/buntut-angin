import kuro from '/img/kuro.png';
import salad from '/img/fresh-salad-with-turkey-eggs-vegetables-removebg-preview.png';
import salad1 from '/img/salad-from-tomatoes-cucumber-red-onions-lettuce-leaves-healthy-summer-vitamin-menu-vegan-vegetable-food-vegetarian-dinner-table-top-view-flat-lay-removebg-preview.png';
import salad2 from '/img/vitamin-salad-fresh-tomatoes-arugula-feta-cheese-peppers-dietary-menu-proper-nutrition-top-view-flat-lay-removebg-preview.png';

function Recipes() {
    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <div className="w-9/12 h-full flex flex-col justify-center items-center">
                    <div className='w-full h-full flex flex-col'>
                        <div className="w-full h-1/2 px-10 pt-10">
                            <div className="w-full h-full bg-green-200 rounded-3xl flex px-16">
                                <div className="w-3/4 flex flex-col items-start justify-center px-8 gap-y-8">
                                    <h1 className="text-5xl">Cook New Dishes</h1>
                                    <h1 className="text-3xl">Like Never Before</h1>
                                </div>
                                <div className="w-1/2 h-full flex justify-center items-center">
                                    <img src={kuro} className="w-full"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-1/2 px-10 py-8 flex">
                            <div className='w-1/2 h-full'>
                                <div className='w-full h-full bg-orange-100 rounded-3xl flex flex-col px-8 py-10'>
                                    <h1 className='w-full text-2xl font-semibold'>Mediterranean Cobb Salad</h1>
                                    <div className='w-full h-full flex'>
                                        <div className='w-1/2 h-full flex items-center'>
                                            <p>American garden salad typically made with chopped salad greens, tomato, crisp bacon, hard-boiled eggs, avocado, chives, blue cheese, and red-wine vinaigrette</p>
                                        </div>
                                        <div className='w-1/2 h-full flex justify-end items-center'>
                                            <img src={salad} className=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 h-full flex flex-col'>
                                <div className='w-full h-full ps-8 flex flex-col gap-y-4'>
                                    <div className='w-full h-1/2 flex bg-cyan-100 rounded-3xl px-12 py-8'>
                                        <div className='w-1/2 h-full flex justify-start items-center'>
                                            <img src={salad1} className='h-full'/>
                                        </div>
                                        <div className='w-1/2 h-full flex flex-col gap-y-1'>
                                            <h1 className='text-2xl font-semibold'>Caesar Salad</h1>
                                            <p className='text-sm'>Romaine lettuce and croutons dressed with lemon juice, olive oil, egg, garlic, Dijon mustard, Parmesan cheese, and black pepper.</p>
                                        </div>
                                    </div>
                                    <div className='w-full h-1/2 flex bg-cyan-100 rounded-3xl px-12 py-8'>
                                        <div className='w-1/2 h-full flex justify-start items-center'>
                                            <img src={salad2} className='h-full'/>
                                        </div>
                                        <div className='w-1/2 h-full flex flex-col gap-y-1'>
                                            <h1 className='text-2xl font-semibold'>Caesar Salad</h1>
                                            <p className='text-sm'>Romaine lettuce and croutons dressed with lemon juice, olive oil, egg, garlic, Dijon mustard, Parmesan cheese, and black pepper.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-1/2 px-10 pt-10">
                            <div className="w-full h-full bg-green-200 rounded-3xl flex px-16">
                                <div className="w-3/4 flex flex-col items-start justify-center px-8 gap-y-8">
                                    <h1 className="text-5xl">Cook New Dishes</h1>
                                    <h1 className="text-3xl">Like Never Before</h1>
                                </div>
                                <div className="w-1/2 h-full flex justify-center items-center">
                                    <img src={kuro} className="w-full"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-1/2 px-10 py-8 flex">
                            <div className='w-1/2 h-full'>
                                <div className='w-full h-full bg-orange-100 rounded-3xl flex flex-col px-8 py-10'>
                                    <h1 className='w-full text-2xl font-semibold'>Mediterranean Cobb Salad</h1>
                                    <div className='w-full h-full flex'>
                                        <div className='w-1/2 h-full flex items-center'>
                                            <p>American garden salad typically made with chopped salad greens, tomato, crisp bacon, hard-boiled eggs, avocado, chives, blue cheese, and red-wine vinaigrette</p>
                                        </div>
                                        <div className='w-1/2 h-full flex justify-end items-center'>
                                            <img src={salad} className=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 h-full flex flex-col'>
                                <div className='w-full h-full ps-8 flex flex-col gap-y-4'>
                                    <div className='w-full h-1/2 flex bg-cyan-100 rounded-3xl px-12 py-8'>
                                        <div className='w-1/2 h-full flex justify-start items-center'>
                                            <img src={salad1} className='h-full'/>
                                        </div>
                                        <div className='w-1/2 h-full flex flex-col gap-y-1'>
                                            <h1 className='text-2xl font-semibold'>Caesar Salad</h1>
                                            <p className='text-sm'>Romaine lettuce and croutons dressed with lemon juice, olive oil, egg, garlic, Dijon mustard, Parmesan cheese, and black pepper.</p>
                                        </div>
                                    </div>
                                    <div className='w-full h-1/2 flex bg-cyan-100 rounded-3xl px-12 py-8'>
                                        <div className='w-1/2 h-full flex justify-start items-center'>
                                            <img src={salad2} className='h-full'/>
                                        </div>
                                        <div className='w-1/2 h-full flex flex-col gap-y-1'>
                                            <h1 className='text-2xl font-semibold'>Caesar Salad</h1>
                                            <p className='text-sm'>Romaine lettuce and croutons dressed with lemon juice, olive oil, egg, garlic, Dijon mustard, Parmesan cheese, and black pepper.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recipes;