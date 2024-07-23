import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import CardLib from '../components/CardLib'
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import SongPlayer from '../components/SongPlayer';



const UserLibrary = () => {
  const userDetails = useSelector((state)=>state.userDetails)
  const {firstName,lastname,role,username} = userDetails;
  return (
    <div className='w-full h-[auto] text-white pb-10 bg-black'>
      <Navbar/>
      <h1 className='text-3xl text-center text-white '>{username.toUpperCase()}'s Library</h1>
      <div className='flex w-full h-full px-20 mt-5 gap-x-10'>
        {/* left  */}
        <div className='w-[30%] px-5 py-10 bg-[#161616] h-full'>
          <div className='w-full px-5 h-[90vh] overflow-y-auto bg-[#0F0F0F] '>
            <div className='flex justify-between w-full '>
              <h2 className='px-5 py-5 text-2xl font-bold'>Playlists</h2>
              <button className='mr-5'><IoAddCircleOutline size={30}/></button>
            </div>
            <div className='w-[95%]  mx-1 h-[5px] bg-black'></div>
            {/* cards */}
            <div className="w-full  justify-between px-5 mt-10  items-center  flex my-2  h-[4.2rem] rounded-2xl bg-[rgb(45,43,43)]">
              <h2 >First playlist</h2>
              <button ><MdDeleteOutline size={25}/></button>
            </div>
          </div>
        </div>

        {/* right  */}
        <div className='w-[70%]  px-5 py-10 bg-[#161616] h-full'>
        <div className='w-full h-[auto]  bg-[#0F0F0F] '>
            <h2 className='px-5 py-5 text-2xl font-bold'>List of songs</h2>
            <div className='w-[95%] mx-2 h-[5px] bg-black'></div>
            <div className='w-full px-10 py-10 h-[78vh]  gap-10 overflow-y-auto bg-[#0F0F0F]'>
              {/* cards */}
              {
                Array(10).fill().map(()=>(
                  <div className='w-[100%] flex justify-around items-center   h-[5rem] bg-[#090909]'>
                  <span>1</span>
                  <span>Song name</span>
                  <span>Artist</span>
                  <button><MdDeleteOutline size={25}/></button>
                </div>
                ))
              }
            </div>
          </div>
        </div>

        <SongPlayer/>
      </div>
    </div>
  )
}

export default UserLibrary
