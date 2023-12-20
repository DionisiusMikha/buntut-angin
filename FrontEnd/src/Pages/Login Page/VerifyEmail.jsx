import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import DietisianService from "../../Services/Dietisian/dietisian";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

function verifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const schema = Joi.object({
    email: Joi.string().required().messages({
      "string.empty": "email tidak boleh kosong",
    }),
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
  });
  const onSubmit = async (data) => {
    const res = await DietisianService.sendVerificationEmail(data.email);
    if (res.status == 200) {
      alert(res.data.message + data.email);
      navigate("/verifycode", { state: { email: data.email } });
    }
  }
    return (
      <div className="bg-cover bg-center h-screen bg-[#f3f3fd]">
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-9rem)]">
          <div className='flex flex-col justify-end h-full mt-32'>
          </div>

          <form className='bg-white ml-16 p-10 mt-60 shadow-xl mx-auto w-full max-w-lg rounded-2xl'
          onSubmit={handleSubmit(onSubmit)}
          >
              <div className='font-bold text-4xl'>Verify Email</div>
              <div className='flex flex-row bg-gray-200 rounded-xl px-2 py-2 mt-20 items-center'>
                  <input
                      type='text'
                      placeholder='Email'
                      className='w-full h-12 max-w-s items-center bg-transparent border-none outline-none px-4 '
                      {...register("email")}
                  />
              </div>
              <div className='h-32'>
                  <button className='w-full text-center font-semibold bg-green-500 rounded-2xl mt-16 py-3 text-white hover:bg-green-600'>
                      <a>
                      send mail
                      </a>
                  </button>
              </div>
          </form>
      </div>
  </div>
    );
}

export default verifyEmail