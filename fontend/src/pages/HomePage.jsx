import React, { useEffect } from 'react'
import SongPlayer from '../components/SongPlayer'


const HomePage = () => {

    useEffect(()=>{

    },[])

  return (
    <div className='w-full h-[100vh] relative  mt-[20vh] md:mt-[15vh] flex flex-col items-center gap-3'>
       <h1 className='text-5xl font-extrabold text-center'>Welcome to my songs list</h1>
       <div className="container w-full h-full bg-slate-700">
        
       </div>
       <div className='flex justify-center'><SongPlayer/> </div>

    </div>
  )
}

export default HomePage
