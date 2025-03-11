import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthor } from '../context/AuthorContext'

const Login = () => {
    const { loginAuthor } = useAuthor()
    const navigate = useNavigate()
    const [admin, setIsAdmin] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false)

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(name, email, password)
        // console.log(e)
        if (!isLogin) {
            try {
                // console.log(import.meta.env.VITE_AUTHOR_API_END_POINT)
                const response = await axios.post(`${import.meta.env.VITE_AUTHOR_API_END_POINT}/login`,
                    { email, password },
                    {
                        headers: { 'content-type': 'application/json' },
                        withCredentials: true
                    }
                );
                //console.log(document.cookie)
                const authorData = response.data;
               // loginAuthor(authorData)
                console.log(response.data)

                if (response.data.success) {
                    toast.success(response.data.message)
                    navigate('/home');
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error:any) {
                //toast.error(error.response?.data?.message)
                toast.error("Invalid credentials..")
                console.log(error.response)
            }
        }
        else {
            try {
                const res = await axios.post(`${import.meta.env.VITE_AUTHOR_API_END_POINT}/register`,    
                    { name, email, password },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    }
                );
                console.log(res)
                if (res.data.success) {
                    navigate('/login')
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error:any) {
                //   console.log("error", error)
                console.log(error);
                toast.error(error.response?.data?.message)
               // toast.error("Invalid Credentials")
            }
        }
    }
    return (
        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

            <div className="flex flex-col justify-center items-center border rounded-2xl  w-[30%] bg-white">
                <div className="font-bold text-3xl py-3">{isLogin ? "Signup Form" : "Login Form"}</div>

                <form onSubmit={submitHandler} className="flex flex-col m-4 gap-3 w-[65%]">
                    {isLogin && (<>
                        <label htmlFor="name" className="font-bold text-lg">Name:</label>
                        <input type="text" className="border border-gray-300 rounded-md p-[8px] text-lg  focus:border-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-300"
                            name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name..." required />
                    </>)}

                    <label htmlFor="email" className="font-bold text-lg" >Email:</label>
                    <input type="email" className="border border-gray-300 rounded-md p-[8px] text-lg focus:border-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-300"
                        name="email" value={email} onChange={((e) => setEmail(e.target.value))} id="email" placeholder="Enter your email..." required />

                    <label htmlFor="password" className="font-bold text-mg">Password:</label>
                    <input type="text" className="border border-gray-300 rounded-md  p-[8px] text-lg  focus:border-blue-500 focus:outline-none focus:shadow-md focus:shadow-blue-300"
                        name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password..." required />

                    <button type="submit" className="border bg-blue-400 rounded-xl w-30 p-[8px] mx-auto cursor-pointer">Submit</button>

                    <p className="mx-auto py-2 ">{isLogin ? "Already have an account? " : "Don't have an account? "}
                        <a onClick={() => setIsLogin(!isLogin)} className="underline text-blue-700" href="#" >{isLogin ? "Login" : "Register"}</a></p>
                </form>

            </div>
        </div>
    )
}
export default Login;