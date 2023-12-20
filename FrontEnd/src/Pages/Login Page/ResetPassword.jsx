import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import DietisianService from "../../Services/Dietisian/dietisian";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const emailRef = useRef("");
    const dispatch = useDispatch();
    const schema = Joi.object({
        Password: Joi.string().required().messages({
            "string.empty": "Password tidak boleh kosong",
        }),
        confirmPassword: Joi.string().required().messages({
            "string.empty": "Confirm Password tidak boleh kosong",
        }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { email } = location.state;
            setEmail(email);
            emailRef.current = email;
        }
    }, [location.state]);

    const onSubmit = async (data) => {
        if (data.Password !== data.confirmPassword) {
            alert("Password tidak sama");
        } else {
            const res = await DietisianService.changePassword(
                emailRef.current,
                data.Password
            );
            if (res.status === 200) {
                alert(res.data.message);
                navigate("/login");
            } else if (res.status === 400) {
                alert(res.data.message);
            }
        }
    };

    return (
        <>
            <div className="bg-cover bg-center h-screen bg-[#f3f3fd]">
                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
                    <div className="flex flex-col justify-end h-full mt-32"></div>

                    <form
                        className="bg-white ml-16 p-10 mt-60 shadow-xl mx-auto w-full max-w-lg rounded-2xl"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="font-bold text-4xl">Reset Password</div>
                        <div className="font-normal text-m mt-5"></div>
                        <div className="flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-20 items-center">
                            <input
                                type="password" // Change type to "password"
                                placeholder="Password"
                                className="w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4"
                                {...register("Password")}
                            />
                        </div>
                        <div className="flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-10 items-center">
                            <input
                                type="password" // Change type to "password"
                                placeholder="Confirm Password"
                                className="w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4"
                                {...register("confirmPassword")}
                            />
                        </div>
                        <div className="h-32">
                            <button
                                className="w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600"
                                type="submit"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
