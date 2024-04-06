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
    audioRef.current.pause(); // Pause the audio before changing the source
    audioRef.current.load(); // Load the new source
    audioRef.current.play(); // Play the audio
  };

  const backward = () => {
    audioRef.current.currentTime -= 10; // Go back 10 seconds
  };

  const forward = () => {
    audioRef.current.currentTime += 10; // Go forward 10 seconds
  };
  // console.log(audioSources[currentIndex]);
  // console.log(name[currentIndex])
  // console.log(name)

  return (
    <div className="fixed border rounded-lg bottom-4">
      <footer class="bg-[#000000] rounded-lg shadow  bg-[#000000]">
        <div class="w-full flex gap-6 mx-auto max-w-screen-xl p-5  justify-center items-center ">
          <div className="text-[#E5E7EB] flex flex-col gap-5 ">
          <div className="flex gap-2 px-10 text-base text-white"><span>Song:</span><span>{name[currentIndex]}</span></div>
          <div className="px-10 text-sm text-[#E5E7EB]">Artist</div>
          </div>
          <ul class="flex flex-wrap gap-10 justify-center items-center  text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <button className="px-5 py-2 border rounded-2xl" onClick={previousSong}>Previous Song  </button>
            </li>
            <li>
              <button className="px-5 py-2 border rounded-2xl" onClick={backward}>Backward</button>
            </li>
            <li>
              <audio ref={audioRef} autoPlay controls width="600px">
                <source src={audioSources[currentIndex]} type="video/mp4" />
                <source src={audioSources[currentIndex]} type="audio/mpeg" />
              </audio>
            </li>

            <li>
            <button className="px-5 py-2 border rounded-2xl" onClick={forward}>Forward</button>
             
            </li>
            <button className="px-5 py-2 border rounded-2xl" onClick={nextSong}>Next Song</button>
            <li>
              
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default SongPlayer;
