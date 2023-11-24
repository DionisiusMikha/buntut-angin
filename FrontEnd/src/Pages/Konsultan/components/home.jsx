import acc from '/icon/acc.png';

function Home() {
    return(
        <>
            <div className="w-full h-full px-8 pt-10">
                <div className="h-16 w-full flex justify-end items-center mb-12">
                    <button className="w-16 h-full text-5xl pb-2 rounded-l-3xl bg-white">«</button>
                    <div className=" h-full flex items-center">
                        <p className="w-28 h-full text-2xl bg-white flex justify-center items-center">Monday</p>
                    </div>
                    <button className="w-16 h-full text-5xl pb-2 rounded-r-3xl bg-white">»</button>
                </div>
                <div className="overflow-y-auto w-full h-5/6 flex flex-col bg-white rounded-xl">
                    <div id='thead' className='w-full h-12 bg-gray-300 flex justify-around items-center px-6'>
                        <label className='w-1/12 flex items-center'>
                            <input type="checkbox" className="checkbox border-black" />
                        </label>
                        <div className='w-5/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Name</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Jadwal</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Status</p>
                        </div>
                        <div className='w-2/12 flex items-center gap-x-3'>
                            <img src={acc} className="w-5 h-5" />
                            <p className='text-xl'>Tag</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;