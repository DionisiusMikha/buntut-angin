function Card({img, title, text}) {
    return (
        <>
            <div className="bg-transparent me-20 my-10">
                <img src={img} alt="" className=""/>
                <div className="text-2xl text-start font-bold py-3 px-5">{title}</div>
                <div className="text-gray-500 font-semibold text-xl px-5 tracking-wide">{text}</div>
            </div>
        </>
    )
}

export default Card;