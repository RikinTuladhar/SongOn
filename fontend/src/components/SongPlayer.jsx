import { data } from "autoprefixer";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
const SongPlayer = () => {
  const { reload, setReload } = useContext(ReloadContext);
  const {SongAPI } = useContext(SongContext);

  const [name, setName] = useState([]);
  const [audioSources, setaudioSources] = useState([]);
  // const mapping = async(index)=>{
  //   return index
  // }
  
  // console.log(SongAPI)

  useEffect(() => {
    // var i= 1;
    // console.log("Song player loaded"  + i);
    nextSong();
    axios
      .get(SongAPI)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        // console.log(res);
        const name = res.map((name)=>name.name);
        setName(name);
        const paths = res.map((song) => song.autoPath);
        setaudioSources(paths);
        // console.log(name);
        // setaudioSources(res);
        setReload(!prev)
      });
  }, [reload,SongAPI]);

  // console.log(audioSources);
  // mapping(audioSources[currentIndex]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  const previousSong = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + audioSources.length) % audioSources.length
    );
    audioRef.current.pause(); // Pause the audio before changing the source
    audioRef.current.load(); // Load the new source
    audioRef.current.play(); // Play the audio
  };

  const nextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % audioSources.length);
    // audioRef.current.pause(); // Pause the audio before changing the source
    audioRef.current.load(); // Load the new source
    audioRef.current.play(); // Play the audio
  };

  const backward = () => {
    audioRef.current.currentTime -= 10; // Go back 10 seconds
  };

  const forward = () => {
    audioRef.current.currentTime += 10; // Go forward 10 seconds
  };

  return (
    <div className="fixed border rounded-lg bottom-4 ">
      <footer class="bg-[#000000] rounded-lg shadow  ">
        {/* parent */}
        <div class="w-full flex-wrap  flex gap-6 md:gap-1 mx-auto max-w-screen-xl md:p-5   md:justify-center  md:items-center ">
          {/* song info  */}
          <div className="text-[#E5E7EB] pt-1 justify-center items-center  mx-auto md:px-0 gap-10 flex flex-wrap  md:flex-col md:gap-5 ">
          <div className="flex gap-2 text-base text-white md:px-10"><span>Song:</span><span>{name[currentIndex]}</span></div>
          <div className="md:px-10 text-sm text-[#E5E7EB]">Artist</div>
          </div>
          {/* controller  */}
          <ul class="flex pb-5 flex-wrap gap-3 md:gap-10 justify-center items-center  font-thin text-xs md:text-lg  md:font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li className="order-2 md:order-1">
              <button className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl" onClick={previousSong}>Previous Song  </button>
            </li>
            <li className="order-3 md:order-2">
              <button className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl" onClick={backward}>Backward</button>
            </li>
            <li className="order-1 mx-5 mx-auto my-0 md:px-0 md:order-3">
              <audio className=" bg-black h-[30px] md:h-[10vh] text-white rounded" ref={audioRef} autoPlay controls width="600px">
                <source src={audioSources[currentIndex]} type="video/mp4" />
                <source src={audioSources[currentIndex]} type="audio/mpeg" />
              </audio>
            </li>

            <li className="order-4 md:order-4">
            <button className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl" onClick={forward}>Forward</button>
             
            </li>
           
            <li className="order-5 md:order-5">
            <button className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl" onClick={nextSong}>Next Song</button>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default SongPlayer;
