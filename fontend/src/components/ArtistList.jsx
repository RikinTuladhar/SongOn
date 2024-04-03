import React from 'react'

const ArtistList = () => {
  return (
    <div className='w-full h-20 bg-[#0F0F0F]   px-5 py-2 flex items-center gap-5'> 
      <div className='w-[40px] h-[40px] flex justify-center' ><img src="/Artist/future.jpg" className='object-cover rounded-full' alt="Image"  /></div>
      <div ><div className='text-base font-bold text-[#E5E7EB]'> Name </div> <div className='font-semibold text-sm  text-[#9C9EA0]'>Artist</div> </div>
     
    </div>
  )
}

export default ArtistList
