import gambar from '/img/gbr-login-register.png'
import { useForm } from 'react-hook-form'
import { useState, react } from 'react';
import DietisianService from '../../Services/Dietisian/dietisian';
import { useEffect } from 'react';


const ResetPassword = () => {
    const {password, setPassword} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await DietisianService.changePassword(password)
            setMessage("Password has been reset")
            setSuccess(true)
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }
    const resetText = () => {
        setError("")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DietisianService.resetPassword()
                setEmail(response.data.email)
            } catch {
                setError("Failed to reset password")
            }
        }
        fetchData()
    }, [])
    

    return (
        <>
            <div className="bg-cover bg-center h-screen bg-[#f3f3fd]">
                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
                    <div className='flex flex-col justify-end h-full mt-32'>
                        <img src={gambar} alt="" className='w-full opacity-0'/>
                    </div>

                    <form className='bg-white ml-16 p-10 mt-60 shadow-xl mx-auto w-full max-w-lg rounded-2xl'>
                        <div className='font-bold text-4xl'>Enter New Password</div>
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-20 items-center'>
                            <input type="text"
                            className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${error ? 'border-red-500' : ''}`}
                            />
                            <div onClick={()=>{
                                resetText()
                            }}>
                            </div>
                        </div>
                        <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-10 items-center'>
                            <input type="text"
                            className={`w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 ${error ? 'border-red-500' : ''}`}
                            />
                            <div onClick={()=>{
                                resetText()
                            }}>
                            </div>
                        </div>
                        <div className='h-32'>
                            <button className='w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600'>
                                <a href="/recovered">
                                Reset Password
                                </a>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;  