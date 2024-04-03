import React, { useState } from 'react'
import ArtistList from './ArtistList'

const HomeLeft = () => {
  const [artist,setArtist] = useState([
    {
        "id": 1,
        "name": "Item 1",
        "image_link": "https://example.com/image1.jpg"
    },
    {
        "id": 2,
        "name": "Item 2",
        "image_link": "https://example.com/image2.jpg"
    },
    {
        "id": 3,
        "name": "Item 3",
        "image_link": "https://example.com/image3.jpg"
    },
    {
        "id": 4,
        "name": "Item 4",
        "image_link": "https://example.com/image4.jpg"
    },
    {
        "id": 5,
        "name": "Item 5",
        "image_link": "https://example.com/image5.jpg"
    },
    {
        "id": 6,
        "name": "Item 6",
        "image_link": "https://example.com/image6.jpg"
    },
    {
        "id": 7,
        "name": "Item 7",
        "image_link": "https://example.com/image7.jpg"
    },
    {
        "id": 8,
        "name": "Item 8",
        "image_link": "https://example.com/image8.jpg"
    },
    {
        "id": 9,
        "name": "Item 9",
        "image_link": "https://example.com/image9.jpg"
    },
    {
        "id": 10,
        "name": "Item 10",
        "image_link": "https://example.com/image10.jpg"
    }
]
)
  return (
    <div className='w-[30%] h-auto mt-3 overflow-y-auto  px-5 py-10 p-5 text-2xl bg-[#11111182] rounded-xl '>
        <h1 className=' text-[#E5E7EB]'> Artist List</h1>
        <div className='w-full   rounded-lg  h-[2px] bg-black mt-10'>
        {artist.map((artist,i)=>(
          <ArtistList/>

        ))}

        </div>

    </div>
  )
}

export default HomeLeft
