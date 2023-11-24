function Report() {
    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 flex flex-col justify-center items-center gap-y-6 py-10 ps-12 pe-4">
                    <div className="w-full h-1/2 bg-white rounded-3xl py-14 px-16">
                        <h1 className="text-4xl">CALORIES PER DAY</h1>
                    </div>
                    <div className="w-full h-1/2 bg-white rounded-3xl py-14 px-16">
                        <h1 className="text-4xl">WEIGHT LOST</h1>
                    </div>
                </div>
                <div className="w-4/12 h-full flex py-10 pe-12">
                    <div className="w-full h-full bg-white rounded-3xl py-12 px-16">
                        <h1 className="text-4xl">REMINDER</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;