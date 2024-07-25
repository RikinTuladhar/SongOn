import { data } from "autoprefixer";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
const SongPlayer = () => {
  const { songClickedId, songArray } = useContext(SongContext);
  const { reload, setReload } = useContext(ReloadContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const [lyricsClicked, setLyricsClicked] = useState(false);
  console.log(songArray[currentIndex]);
  console.log(currentIndex);

  const playAudio = () => {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Error attempting to play audio:", error);
      });
    }
  };

  const previousSong = () => {
    if (!songArray || songArray.length === 0) return;

    if (currentIndex <= 0) {
      setCurrentIndex(songArray.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    audioRef.current.load();
    audioRef.current.play();
    playAudio();
  };

  const nextSong = () => {
    if (!songArray || songArray.length === 0) return;

    if (currentIndex < songArray.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    audioRef.current.load();
    audioRef.current.play();
    playAudio();
  };

  const backward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  useEffect(() => {
    if (!songArray || songArray.length === 0) return;
    setCurrentIndex(songClickedId);
    audioRef.current.load();
    playAudio();
  }, [songClickedId]);

  return (
    <>
      {lyricsClicked && (
        <div className="absolute pb-40 md:px-52 w-full h-full px-5 top-10 py-5 rounded-lg mt-10 overflow-auto text-white bg-[#000000]">
          <div className="py-10 bg-black md:w-full rounded-2xl">
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-10">
              <span className="text-4xl font-bold">Lyrics</span>
              <span className="w-full h-auto text-sm font-bold text-center whitespace-pre-wrap md:text-xl md:tracking-widest">
                {songArray && songArray[currentIndex]?.lyrics
                  ? songArray[currentIndex].lyrics
                  : "No lyrics available"}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        className={`fixed w-[80%] left-[50%] -translate-x-[50%] border rounded-lg bottom-4`}
      >
        <footer className="bg-[#000000] py2 rounded-lg shadow">
          <div className="flex flex-col w-full max-w-screen-xl gap-6 mx-auto md:gap-5 md:p-5 md:justify-center md:items-center">
            <div className="text-[#E5E7EB] pt-1  justify-center items-center mx-auto md:px-0 gap-10 flex  md:gap-5">
              {/* song:  */}
              <div className="flex gap-2 text-xl font-semibold text-white md:px-10">
                <span className="bg-gradient-to-l from-[#5c747e] to-[#c9d4d8] bg-clip-text text-transparent">Song :</span>
                <span className="text-transparent bg-gradient-to-br from-[#b1b8c8] to-[#afb1ca] bg-clip-text">
                  {songArray && songArray[currentIndex]?.name
                    ? songArray[currentIndex].name
                    : ""}
                </span>
              </div>
              {/* artist */}
              {/* <div className="flex gap-2 text-base text-white md:px-10">
                <div>
                  <span>Artist:</span>
                  <span>
                    {songArray && songArray[currentIndex]?.artist
                      ? songArray[currentIndex]?.artist[0]?.name
                      : ""}
                  </span>
                </div>
              </div> */}
              {lyricsClicked ? (
                <div
                  className="text-xl font-semibold md:px-10  text-[#E5E7EB] cursor-pointer bg-gradient-to-l from-[#797dd3] to-[#cbafaf] bg-clip-text text-transparent"
                  onClick={() => setLyricsClicked(!lyricsClicked)}
                >
                 <div className="flex items-center justify-center gap-5">
                    Hide Lyrics{" "}
                    <div>
                      {" "}
                      <CiUnread size={25} className="text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="text-xl   font-semibold md:px-10  text-[#E5E7EB] cursor-pointer bg-gradient-to-l from-[#797dd3] to-[#cbafaf] bg-clip-text text-transparent"
                  onClick={() => setLyricsClicked(!lyricsClicked)}
                >
                  <div className="flex items-center justify-center gap-5">
                    Show Lyrics{" "}
                    <div>
                      {" "}
                      <CiRead size={25}  className="text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-3 pb-5 text-xs font-thin text-gray-500 md:gap-10 md:text-lg md:font-medium dark:text-gray-400 sm:mt-0">
              <li className="order-2 md:order-1">
                <button
                  className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                  onClick={previousSong}
                >
                  Previous Song
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
                  className="bg-black h-[30px] md:h-[10vh] text-white rounded"
                  ref={audioRef}
                  controls
                  width="600px"
                >
                  {songArray && songArray[currentIndex] && (
                    <source
                      src={songArray[currentIndex]?.autoPath}
                      type="audio/mpeg"
                    />
                  )}
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
