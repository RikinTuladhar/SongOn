import React, { useEffect } from 'react'
import SongPlayer from '../components/SongPlayer'
import HomeLeft from '../components/HomeLeft'
import HomeRight from '../components/HomeRight'


const HomePage = () => {

    useEffect(()=>{

    },[])

  return (
    <div className='w-full h-[auto] bg-[#000000] relative  mt-[12vh] pt-5 md:pb-40 md:mt-[10vh] overflow-hidden flex flex-col items-center gap-3'>
       <h1 className='text-2xl my-3  md:my-0 md:text-3xl font-extrabold text-center text-[#E5E7EB] '>Welcome to my songs list</h1>
       <div className="container flex-wrap md:flex-nowrap flex w-full h-full gap-5">
        <HomeLeft/>
        <HomeRight/>
       </div>
      

    </div>
  )
}

export default HomePage
