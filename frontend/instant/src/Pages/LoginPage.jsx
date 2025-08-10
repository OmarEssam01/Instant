import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { use, useState } from 'react'
import { login } from '../lib/api.js'
import {ShipWheelIcon} from "lucide-react"
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import useLogin from '../hooks/useLogin.js'

const LoginPage = () => {


  const [ loginData , setLoginData ] = useState({
    email: "",
    password: "",
  })

  // const queryClient = useQueryClient()

  //  const {mutate: loginMutation , isPending , error} = useMutation({
  //   mutationFn: login, 
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({queryKey:"authUser"})
  //   },
  //   onError: (error) => {
  //   console.error(error.response.data); // helpful for debugging
  // },
  //  })
   const {isPending , error , loginMutation } = useLogin()
   const handleLogin = (e) => {
    e.preventDefault() 
    loginMutation(loginData)
   }
  return (
    // SCREEN DIV
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">


      
      {/* Entire LOGIN DIV */}
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>



      {/* LEFT SIDE */}
      <div className=' flex flex-col w-full lg:w-1/2 p-4 sm:p-8'>


      {/* LOGO DIV */}
        <div className=' mb-4  flex  justify-start items-start gap-2 '>
        <ShipWheelIcon className='size-9 text-primary'/>
        <span
        className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            Instant
        </span>
        </div>
        {/* ERROR MSG DISPLAY  */}
        {error &&(
          <div className='alert alert-error'>
            <span>
              {error.response.data.message}
            </span>
          </div>
        )}

        <div className='w-full'>
        <form onSubmit={handleLogin}>
          <div className='space-y-4'>
        <div>
          <h2 className='text-xl font-semibold'>Welcome back</h2>
          <p className='text-sm opacity-70'>
            Sign In To Your Account To Continue Your Language Journey
          </p>
        </div>
          </div>
          {/* EMAIL & PASSWORD */}
          <div className='flex flex-col gap-3'>
            {/* EMAIL */}
            <div className='form-control w-full space-y-2'>
            <label className='label'>
              <span className='label-text'>
            Email
              </span>
            </label>
            <input 
            type="email"
            placeholder='Hello@gmail.com'
            className='input input-bordered w-full'
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData , email: e.target.value})}
            required  />
            </div>

            {/* PASSWORD */}
            <div className='form-control w-full space-y-2'>
            <label className='label'>
              <span className='label-text'>
            Password
              </span>
            </label>
            <input 
            type="password"
            placeholder='*********'
            className='input input-bordered w-full'
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData , password: e.target.value})}
            required  />
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isPending}>
            {isPending ? (
              <>
              <span className='loading loading-spinner loading-xs'>
                Signing In ....
              </span>
              </>
            ) : ("Sign in") }
            </button>

            <div className='text-center mt-4'>
            <p className='text-sm'>
              Don't have an Account ? {""}
              <Link to="/signup" className='text-primary hover:underline'>
              Create One.
              </Link>
            </p>
            </div>



          </div>
        </form>
        </div>
      </div>
            {/* RIGHT SIDE */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
            <div className='max-w-md p-8'>
              {/* ILLUSTRATION */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/i.png" alt="Language Connection Illustration" className='w-full h-full' />
            </div>


            <div className='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'>
            Connect With Language Partners WorldWide
            </h2>
            <p className='text-sm opacity-70'>
            Practice conversations, make friends, and improve your language skills together
            </p>
            </div>


            </div>
      </div>



      </div>
    </div>
  )
}

export default LoginPage