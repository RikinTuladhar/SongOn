import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [data,setData] = useState({
        email:'',
        firstname:'',
        lastname:'',
        password:''
    })
    const handleChange = (e)=>{
        const {name,value} = e.target
        setData({...data,[name]:value})
    }
    console.log(data)
  return (
    <div className='bg-[#000000] w-full py-[100px] min-h-[100vh] grid place-items-center'>
     <main class="flex text-white  items-center  justify-center h-screen">
      <div
        class="rounded-lg bg-[#0f0f0f] border bg-card text-card-foreground shadow-sm w-full max-w-md"
        data-v0-t="card"
      >
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="whitespace-nowrap font-semibold tracking-tight text-2xl">
            Sign Up
          </h3>
          <p class="text-sm break-words text-muted-foreground">
            Enter  email, firstname, lastname and password to create your account.
          </p>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >
              Email
            </label>
            <input
              class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="m@example.com"
              required=""
              type="email"
              name='email'
              onChange={handleChange}
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="firstname"
            >
              First Name
            </label>
            <input
              class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="firstname"
              required=""
              type="text"
              onChange={handleChange}
              name="firstname"
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="lastname"
            >
              Last Name
            </label>
            <input
              class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="lastname"
              required=""
              type="text"
              onChange={handleChange}
              name='lastname'
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="password"
            >
              Password
            </label>
            <input
              class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              required=""
              type="password"
              onChange={handleChange}
              name='password'
              
            />
          </div>
        </div>
        <div class="flex flex-col gap-5 items-center p-6">
          <button
            type="submit"
            className="border font-bold break-words px-5 py-2 rounded-2xl hover:scale-105  hover:bg-white hover:text-black duration-500"
          >
            Sign Up
          </button>
          <div>
            Already have an account ? <Link to={"/signin"}>Sign in</Link>
          </div>
          <div>
           <Link to={"/"}>Go back</Link>
          </div>
        </div>
      </div>
    </main>
    </div>
   
  )
}

export default SignUp
