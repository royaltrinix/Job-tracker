import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError ] = useState('');

  const { session,signInUser  } = userAuth();
  const navigate = useNavigate();


  const handleSignIn = async (e) => {
    e.preventDefault() 
    setLoading(true);
    try{
      const result = await signInUser(email, password);
      if(result.success){
        navigate('/dashboard');
      }
    }catch(err){
      setError("an error occured")
    }finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignIn} className='max-w-md m-auto pt-24'>
        <h2 className='font-bold pb-2'>Sign in</h2>
        <p>
          Dont have an account? <Link to="/signup">Sign up!</Link>
        </p>
        <div>
          <input 
            placeholder='Email' 
            className='p-3 mt-6' 
            type='email' 
            onChange = {(e) => setEmail(e.target.value)}
          />
          <input 
            placeholder='Password' 
            className='p-3 mt-6' 
            type='password'
            onChange = {(e) => setPassword(e.target.value)}
           />
          <button type='submit' disabled={loading} className='mt-6 w-full'>
            Sign In
          </button>
          {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
        </div>
      </form>
    </div>
  )
} 

export default SignIn