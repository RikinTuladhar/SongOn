import React, { useState } from "react";
import CardLib from "./CardLib";

const HomeRight = () => {
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
    }, {
      "id": 9,
      "name": "Item 9",
      "image_link": "https://example.com/image9.jpg"
  },
  {
      "id": 10,
      "name": "Item 10",
      "image_link": "https://example.com/image10.jpg"
  }, {
    "id": 9,
    "name": "Item 9",
    "image_link": "https://example.com/image9.jpg"
},
{
    "id": 10,
    "name": "Item 10",
    "image_link": "https://example.com/image10.jpg"
}, {
  "id": 9,
  "name": "Item 9",
  "image_link": "https://example.com/image9.jpg"
},
{
  "id": 10,
  "name": "Item 10",
  "image_link": "https://example.com/image10.jpg"
}, {
  "id": 9,
  "name": "Item 9",
  "image_link": "https://example.com/image9.jpg"
},
{
  "id": 10,
  "name": "Item 10",
  "image_link": "https://example.com/image10.jpg"
}, {
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
    <div className="w-[80%] h-auto overflow-y-auto  mt-3 px-10 py-10 bg-[#11111182] rounded-xl ">
      <h1
        className="text-2xl text-[#E5E7EB] "
      >
        Librarys
      </h1>
      <div className='w-full mt-3 h-[2px] bg-black  '></div>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-6 overflow-y-auto">
        {artist.map((card,id)=>(
          <CardLib id={card.id}/>
        ))}
      </div>

      </div>
   
  );
};

export default HomeRight;
