import { data } from "autoprefixer";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
import SongApi from "../Apis/SongApi";
import GenreApi from "../Apis/GenreApi";
import { useOutletContext } from "react-router-dom";
import { set } from "firebase/database";
const SongPlayer = () => {
  /* These lines of code are setting up various hooks and context values in a React functional component
called `SongPlayer`. Here's a breakdown of what each line is doing: */

  const { songId, songClickedId, songArray } = useContext(SongContext);
  const { reload, setReload } = useContext(ReloadContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const [lyricsClicked, setLyricsClicked] = useState(false);

  // const [mobileView,setMobileView] = useState(false);
  // useEffect(()=>{
  //   if(window.innerWidth <= 625){
  //     setMobileView(true)
  //   }else if(window.innerWidth > 625 ){
  //     setMobileView(false)
  //   }else{
  //     setMobileView(false)
  //   }

  // },[])
  // console.log(mobileView)

  // console.log(songArray);
  // console.log(currentIndex);

  const previousSong = () => {
    if (currentIndex < 0) {
      setCurrentIndex(songArray.length - 1); // Play the audio
      audioRef.current.load(); // Load the new source
      audioRef.current.play();
      return;
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      // audioRef.current.pause(); // Pause the audio before changing the source
      audioRef.current.load(); // Load the new source
      audioRef.current.play(); // Play the audio
    }
  };

  const nextSong = () => {
    // console.log(currentIndex);
    // console.log( songArray.length);

    if (currentIndex < songArray.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      audioRef.current.pause(); // Pause the audio before changing the source
      audioRef.current.load(); // Load the new source
      audioRef.current.play();
    } else {
      setCurrentIndex(0);
      audioRef.current.load(); // Load the new source
      audioRef.current.play();
      // Play the audio
    }
  };

  const backward = () => {
    audioRef.current.currentTime -= 10; // Go back 10 seconds
  };

  const forward = () => {
    audioRef.current.currentTime += 10; // Go forward 10 seconds
  };

  useEffect(() => {
    setReload(true);
    return () => {
      setReload(false);
    };
  }, [reload, songId, songArray]);
  useEffect(() => {
    (() => {
      setCurrentIndex(songClickedId);
      audioRef.current.load(); // Load the new source
      audioRef.current.play();
    })();
  }, [songClickedId]);

  // console.log(currentIndex);
  // console.log(songArray);
  // console.log(songArray[currentIndex]?.autoPath);
  return (
    <>
      {lyricsClicked && (
        <div className="absolute pb-40 md:px-52 w-full h-full px-5 top-10 py-5 rounded-lg mt-10 overflow-auto text-white bg-[#000000]">
          <div className="py-10 bg-black md:w-full rounded-2xl">
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-10">
              <span className="text-4xl font-bold">Lyrics</span>
              {/* break words and witespace-pre-wrap = <pre></pre>  */}
              <span className="w-full h-auto text-sm font-bold text-center whitespace-pre-wrap md:text-xl md:tracking-widest">
                {songArray[currentIndex]?.lyrics ?? "No lyrics available"}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={`fixed border rounded-lg bottom-4`}>
        <footer class="bg-[#000000] py2  rounded-lg shadow  ">
          {/* parent */}
          <div class="w-full flex-wrap  flex gap-6 md:gap-5 mx-auto max-w-screen-xl md:p-5   md:justify-center  md:items-center ">
            {/* song info  */}
            <div className="text-[#E5E7EB] pt-1 justify-center items-center  mx-auto md:px-0 gap-10 flex flex-wrap  md:flex-col md:gap-5 ">
              <div className="flex gap-2 text-base text-white md:px-10">
                <span>Song:</span>
                <span>{songArray[currentIndex]?.name}</span>
              </div>
              {lyricsClicked ? (
                <div
                  className="md:px-10 text-sm text-[#E5E7EB] cursor-pointer  bg-gradient-to-bl from-red-600 to-purple-800 bg-clip-text text-transparent  "
                  onClick={(e) => setLyricsClicked(!lyricsClicked)}
                >
                  Hide Lyrics
                </div>
              ) : (
                <div
                  className="md:px-10 text-sm text-[#E5E7EB] cursor-pointer  bg-gradient-to-bl from-red-600 to-purple-800 bg-clip-text text-transparent  "
                  onClick={(e) => setLyricsClicked(!lyricsClicked)}
                >
                  Show Lyrics
                </div>
              )}
            </div>
            {/* controller  */}
            <ul class="flex pb-5 flex-wrap gap-3 md:gap-10 justify-center items-center  font-thin text-xs md:text-lg  md:font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li className="order-2 md:order-1">
                <button
                  className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                  onClick={previousSong}
                >
                  Previous Song{" "}
                </button>
              </li>
              <li className="order-3 md:order-2">
                <button
                  className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                  onClick={backward}
                >
                  Backward
                </button>
              </li>
              <li className="order-1 mx-auto my-0 md:px-0 md:order-3">
                <audio
                  className=" bg-black h-[30px] md:h-[10vh] text-white rounded"
                  ref={audioRef}
                  autoPlay
                  controls
                  width="600px"
                >
                  {/* <source src={audioSources[currentIndex]} type="video/mp4" /> */}
                  <source
                    src={songArray[currentIndex]?.autoPath}
                    type="audio/mpeg"
                  />
                </audio>
              </li>
              <li className="order-4 md:order-4">
                <button
                  className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                  onClick={forward}
                >
                  Forward
                </button>
              </li>
              <li className="order-5 md:order-5">
                <button
                  className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                  onClick={nextSong}
                >
                  Next Song
                </button>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default memo(SongPlayer);
