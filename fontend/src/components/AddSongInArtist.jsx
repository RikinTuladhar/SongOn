import React, { useEffect, useState } from 'react'
import SongApi from '../Apis/SongApi'
import ArtistApi from '../Apis/ArtistApi'
import Wave from "../SVG/Wave";
const AddSongInArtist = () => {
    const {getSong} = SongApi();
    const {getArtist,putSongOnArtist} = ArtistApi()
    const [song,setSong] = useState();
    const [artist,setArtist] = useState();
    const [data,setData] = useState({
        artistId:"",
        songId:""
    })
    useEffect(()=>{
        ;(()=>{
            Promise.all([getArtist(),getSong()])
            .then(([artist,song])=>{
                // console.log(artist)
                setArtist(artist)
                console.log(song)
                setSong(song)
            }).catch((err)=>{
                console.log(err)
            })
        })()
    },[])

    const handleChange =(e)=>{
        const {name,value} =  e.target
        setData({...data,[name]:value})
    }
    // console.log(data)

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("clicked")
        putSongOnArtist(data.artistId,data.songId)
        .then((res)=>{
            alert(res.data)
            
        })
        .catch((err) => {
            console.log(err);
          });
    }

  return (
    <div>
      <div className="w-full px-5  flex justify-center items-center h-[100vh] bg-[#0E0F19] text-white">
      <div className="w-full rounded-2xl h-auto md:h-[95%] bg-[#66788F] flex flex-col justify-center items-center gap-5">
        <div className="h-[20%]  my-10">
          <h1 className="text-2xl font-bold md:text-5xl ">Song in Genre Edit</h1>
        </div>
        <div className="w-full h-full ">
          <form
            onSubmit={handleSubmit}
            className="relative w-full h-full text-black"
          >
            <div className="flex w-full h-[80%] justify-around flex-wrap">
              {/* genre  */}
              <div className="flex flex-col">
                <label
                  className="px-5 py-5 text-xl font-semibold md:text-2xl"
                  htmlFor="artistId"
                >
                  Select Artist
                </label>
                <select
                  onChange={handleChange}
                  name="artistId"
                  id=""
                  className="p-[3px] text-base md:p-[10px] md:text-[16px] rounded-md"
                >
                  <option disabled selected>
                    Select Artist
                  </option>
                  {artist?.map((artist, i) => (
                    <option key={i} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* song  */}
              <div className="flex flex-col">
                <label
                  className="px-5 py-5 text-xl font-semibold md:text-2xl "
                  htmlFor="songId"
                >
                  Select Song
                </label>
                <select
                  name="songId"
                  id=""
                  onChange={handleChange}
                  className="p-[3px] text-base md:p-[10px] md:text-[16px] rounded-md"
                >
                  <option disabled selected>
                    Select Song
                  </option>
                  {song?.map((song, i) => (
                    <option key={i} value={song.id}>
                      {song.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center mb-5">
              <button
                className="z-50 my-5 duration-300 outline-none cursor-pointer group hover:rotate-90"
                title="Add New"
              >
                <svg
                  className="duration-300 stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0"
                  viewBox="0 0 24 24"
                  height="50px"
                  width="50px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-width="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  ></path>
                  <path stroke-width="1.5" d="M8 12H16"></path>
                  <path stroke-width="1.5" d="M12 16V8"></path>
                </svg>
              </button>
            </div>
            <Wave />
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddSongInArtist
