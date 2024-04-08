import React, { useContext, useEffect, useState } from 'react'
import ArtistList from './ArtistList'
import { Link } from 'react-router-dom'
import axios from "axios";
import { SongContext } from '../contextprovider/SongProvider';
const HomeLeft = () => {
  const [artist,setArtist] = useState([])
  const{API} = useContext(SongContext)
  useEffect(()=>{
    axios.get(`${API}/artist`).then((res)=>{
        console.log(res.data);
        setArtist(res.data)
    })
  },[])
  return (
    <div className='w-[30%] h-auto mt-3 overflow-y-auto  px-5 py-10 p-5 text-2xl bg-[#11111182] rounded-xl '>
        <h1 className=' text-[#E5E7EB]'> Artist List</h1>
        <div className='w-full   rounded-lg  h-[2px] bg-black mt-10'>
        {artist.map((artist,i)=>(
        
         <Link key={i} to={`/artist/${artist.id}`}> <ArtistList name={artist.name} /></Link>
        ))}

        </div>

    </div>
  )
}

export default HomeLeft
