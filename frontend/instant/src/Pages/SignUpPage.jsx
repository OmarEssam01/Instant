import React, { useState } from 'react'
import {ShipWheelIcon} from "lucide-react"
import {Link} from "react-router"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {axiosInstance} from "../lib/axios.js"
import { signup } from '../lib/api.js'
import useSignup from '../hooks/useSignup.js'
const SignUpPage = () => {

  const [signupData , setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",

  })
  // const queryClient = useQueryClient()

  // const {mutate: signupMutation,isPending ,error} = useMutation({
  //   mutationFn: signup,
  //   onSuccess:() => queryClient.invalidateQueries({queryKey: ["authUser"]}),
     
  // })
  const {isPending ,error , signupMutation} = useSignup()
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData)
  }
  return <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ' data-theme="forest">
    
    <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

    {/* left side  */}
    <div className=' w-full lg:w-1/2 flex flex-col p-4 sm:p-8  '>

    {/* Logo  */}
      <div className='mb-4 flex flex-row items-start justify-start gap-2'>
      <ShipWheelIcon className=" size-9 text-primary" />
      <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider'>
        Instant
      </span>
      </div>
      {/* error state */}
      {error&& (
        <div className='alert alert-error mb-4'>
          <span>{error.response.data.message}</span>
        </div>
      )}

        {/* Form */}
      <div className='w-full'>
      <form onSubmit={handleSignup}>
        <div className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'>Create An Account</h2>
            <p className='text-sm opacity-70'>Join Instant and Start Your Language Learning Adventure</p>
          </div>
          <div className='space-y-3'>
            {/* FullName */}
          <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Full Name</span>
          </label>
          <input 
          type="text" 
          placeholder='John Doe' 
          className='input input-bordered w-full '
          value={signupData.fullName}
          onChange={(e) => setSignupData({...signupData , fullName: e.target.value})}
          required
          
          />
          </div>
              {/* Email */}
               <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input 
          type="email" 
          placeholder='John@Email.com' 
          className='input input-bordered w-full '
          value={signupData.email}
          onChange={(e) => setSignupData({...signupData , email: e.target.value})}
          required
          
          />
          </div>
          {/* Password */}
               <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <input 
          type="password" 
          placeholder='********' 
          className='input input-bordered w-full '
          value={signupData.password}
          onChange={(e) => setSignupData({...signupData , password: e.target.value})}
          required
          
          />
          <p className='text-xs opacity-70 mt-1'>Password Must be Atleast 6 Characters Long !</p>
          </div>
           

          <div className='form-control'>
            <label className='label cursor-pointer justify-start gap-2'>
              <input type="checkbox"  className='checkbox checkbox-sm' required/>
              <span className='text-xs leading-tight'>
                I agree to the {""} 
                <span className='text-primary hover:underline'>terms of service</span>
                <span className='text-primary hover:underline'>privacy policy</span>
                </span>
            </label>
          </div>
          </div>

        <button className='btn btn-primary w-full' type='submit'>
          {isPending ? (
            <>
            <span className='loading loading-spinner loading-xs'>
            </span>
            Loading...
            </>
          ) : ("Create Account")}
        </button>

        <div className='mt-4 text-center'>
          <p className='text-sm'>
          Already have an Account ? {" "}
          <Link to="/login" className='text-primary hover:underline' > Sign In </Link>
          </p>
        </div>
        

        </div>

      </form>
      </div>
      
    </div>

    {/* right Side */}
    <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8 '>
          {/* THE PICTURE */}
          <div className='relative aspect-square max-w-sm mx-auto '>
        <img src="/i.png" alt="Language connection Illustration" className='w-full h-full' />
          </div>

          <div className='text-center space-y-3 mt-6 '>
          <h2 className='text-xl font-semibold '> Connect With Language Partners WorldWide</h2>
          <p className='opacity-70'>Practice Conversations , Make Friends , and improve Your Language skills together </p>
          </div>



        </div>
    </div>






    </div>




  </div>
}

export default SignUpPage