import React, { useContext, useEffect, useState } from 'react'
import { ReloadContext } from '../../../contextprovider/ReloadProvider';
import GenreApi from '../../../Apis/GenreApi';
const EditGenre = () => {
    const {getGenre} = GenreApi();
    const [genre,setGenre] = useState([]);
    const {reload,setReload} = useContext(ReloadContext);

useEffect(()=>{
    (async()=>{
        const res = await getGenre("/genre");
        setGenre(res);
        // console.log(res);
    })()
},[reload])

  return (
    <div>
    <div>
      <p className="text-3xl font-bold text-center">Genre List</p>
    </div>
    <div className="mt-16 ml-10 ">
      <div className="grid w-full grid-cols-3 gap-10">
       {genre?.map((g)=>(
        <li>{g.name}</li>
       ))}
      </div>
    </div>
  </div>
  )
}

export default EditGenre
