function Home() {
    return (
        <>
           <div className="flex flex-col justify-evenly px-10 h-screen py-10">
                <div className="flex flex-row h-1/2">
                    <div className="bg-white w-1/3 me-4 rounded-xl drop-shadow-md px-5 py-5">
                        <div className="text-3xl font-semibold">Recipe</div>
                    </div>
                    <div className="bg-white w-2/3 ms-4 rounded-xl drop-shadow-md px-5 py-5">
                        <div className="text-3xl font-semibold">Subscriptions</div>
                    </div>
                </div>
                <div className="bg-white w-full mt-8 h-1/2 rounded-xl drop-shadow-md px-5 py-5">
                    <div className="text-3xl font-semibold">Web Analytics</div>
                </div>
           </div>
        </>
    )
}

export default Home;