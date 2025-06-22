import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();

        const data = { email, password };
        console.log(data);
        // setMessage("");
        // try {
        //     const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ email, password })
        //     });

        //     const data = await response.json();

        //     if (response.ok) {
        //         localStorage.setItem("token", data.token);
        //         window.location.href = "/";
        //     } else {
        //         setMessage(data.message || "Login failed. Please try again.");
        //     }
        // } catch (error) {
        //     setMessage("An error occurred. Please try again later.");
        // }
    };
    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow  bg-white max-auto p-8 rounded-lg'>
                <h2 className='text-2xl font-semibold text-center pt-5'>Please Login</h2>
                <form className='space-y-5 mt-5 max-w-sm mx-auto pt-8' onSubmit={handleLogin}>
                    <input type="email" name='email' id="email" placeholder='Email Address' required
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    <input type="password" name='password' id="password" placeholder='Password' required
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    {message && <p className='text-red-500 text-center'>{message}</p>}
                    <button type='submit'
                        className='w-full mt-5 bg-primary text-white py-3 rounded-md hover:bg-red-300  font-medium transition duration-300'>
                        Login
                    </button>
                </form>
                <p className='my-5 italic text-center text-sm '>Don't have an account?
                    <Link to="/register" className='text-primary px-1 underline'>Register</Link>here.
                </p>
            </div>
        </section>
    )
}

export default Login