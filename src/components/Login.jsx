import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading]=useState(false)

    const login = async(data) => {
        // console.log(data);
        setLoading(true)
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                toast.success("Login Success!");
            }
        } catch (error) {
            setError(error.message)
            toast.error("Login Failed");
        }
        setLoading(false)
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 my-14 mt-36`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full" style={{width:"50%", marginLeft:"100px"}}>
                        <Logo width="100%"/>
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    // options
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >
                {
                    loading ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 50 50"
                        style={{textAlign:"center", fontSize:"15px", marginLeft:"46%", width:"30px"}}
                        >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke-width="5"
                            stroke="#ccc"
                            stroke-dasharray="31.41592653589793 31.41592653589793"
                        >
                            <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="1s"
                            repeatCount="indefinite"
                            />
                        </circle>
                        </svg>

                    ) : "Sign in"
                }
                </Button>
                <ToastContainer />
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login