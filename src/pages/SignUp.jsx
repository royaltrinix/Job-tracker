import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError ] = useState('');

  const { session,signUpNewUser  } = userAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault() 
    setLoading(true);
    try{
      const result = await signUpNewUser(email, password);
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
      <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
        <h2 className='font-bold pb-2'>Sign up today!</h2>
        <p>
          Already have an account? <Link to="/signin">Sign in!</Link>
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
            Sign Up
          </button>
          {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
        </div>
      </form>
    </div>
  )
} 

export default SignUp