import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/auth/authApi';

const Register = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [registerUser, { isloading: registerLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = { username, email, password };
        try {
            const response = await registerUser(data).unwrap();
            if (response) {
                setMessage("Registration successful! Please login.");
                setUsername("");
                setEmail("");
                setPassword("");
                navigate("/login");
            }
            else {
                setMessage("Registration failed. Please try again.");
            }
        }
        catch (error) {
            console.error("Registration failed:", error);
            setMessage(error.data?.message || "Registration failed. Please try again.");
        }
    }

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow  bg-white max-auto p-8 rounded-lg'>
                <h2 className='text-2xl font-semibold text-center pt-5'>Please Register</h2>
                <form className='space-y-5 mt-5 max-w-sm mx-auto pt-8' onSubmit={handleRegister}>
                    <input type="text" name='username' id="username" placeholder='Username' required
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    <input type="email" name='email' id="email" placeholder='Email Address' required
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    <input type="password" name='password' id="password" placeholder='Password' required
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    {message && <p className='text-red-500 text-center'>{message}</p>}
                    <button type='submit'
                        className='w-full mt-5 bg-primary text-white py-3 rounded-md hover:bg-red-300  font-medium transition duration-300'
                        disabled={registerLoading}>
                        {registerLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className='my-5 italic text-center text-sm '>Already have an account? Please
                    <Link to="/login" className='text-primary px-1 underline'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register