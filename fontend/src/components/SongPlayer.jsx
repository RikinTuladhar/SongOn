import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { useSelector } from "react-redux";
import "./SongPlayer.css";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import { MdForward10 } from "react-icons/md";
import { MdReplay10 } from "react-icons/md";
// import {songClickedId} from "../Apis/SongSlice"

const SongPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const songClickedId = useSelector((state) => state.song?.songIndex);
  const songs = useSelector((state) => state.song.songs);
  const audioRef = useRef(null);
  const [lyricsClicked, setLyricsClicked] = useState(false);
  // console.log(songs)

  const playAudio = () => {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Error attempting to play audio:", error);
      });
    }
  };

  const previousSong = () => {
    if (!songs || songs.length === 0) return;

    if (currentIndex <= 0) {
      setCurrentIndex(songs.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    audioRef.current.load();
    audioRef.current.play();
    playAudio();
  };

  const nextSong = () => {
    if (!songs || songs.length === 0) return;

    if (currentIndex < songs.length - 1) {
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

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!songs || songs.length === 0) return;
    setCurrentIndex(songClickedId);
    audioRef.current.load();
    playAudio();
  }, [songClickedId, songs]);

  useEffect(() => {
    // Trigger the animation after the component mounts
    if (songs.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [songs?.length, songs]);

  const [iconShowButtons, setIconsShowButton] = useState(false);

  useEffect(() => {
    const handleView = () => {
      if (window.innerWidth >= 300 && window.innerWidth <= 400) {
        setIconsShowButton(true);
      } else {
        setIconsShowButton(false);
      }
    };

    // Add the event listener
    window.addEventListener("resize", handleView);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleView);
    };
  }, []);

  return (
    <>
      {isVisible ? (
        // mobile view

        <span
          style={{
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "fadeIn 1s ease-in " : "fadeOut 1s ease-out",
          }}
        >
          {lyricsClicked && (
            <div className="absolute  md:px-52 w-full h-full px-5 top-10 pt-5 pb-52 overflow-auto rounded-lg mt-10  text-white bg-[#000000]">
              <div className="py-10 bg-black md:w-full rounded-2xl">
                <div className="relative flex flex-col items-center justify-center w-full h-full gap-10">
                  <span className="text-4xl font-bold">Lyrics</span>
                  <span className="flex-wrap w-full h-auto text-sm font-semibold text-center whitespace-pre-wrap md:text-xl md:tracking-widest">
                    {songs && songs[currentIndex]?.lyrics
                      ? songs[currentIndex].lyrics
                      : "No lyrics available"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            className={`fixed  w-full md:w-[80%] left-[50%] -translate-x-[50%] border rounded-lg bottom-4`}
          >
            <footer className="bg-[#000000] py2 md:text-xl  text-sm rounded-lg shadow">
              <div className="flex flex-col w-full max-w-screen-xl gap-6 mx-auto md:gap-5 md:p-5 md:justify-center md:items-center">
                <div className="text-[#E5E7EB]   pt-1  justify-center items-center mx-auto md:px-0 gap-10 flex  md:gap-5">
                  {/* song:  */}
                  <div className="flex gap-2 font-semibold text-white md:px-10">
                    <span className="bg-gradient-to-l from-[#5c747e] to-[#c9d4d8] bg-clip-text text-transparent">
                      Song :
                    </span>
                    <span className="text-transparent bg-gradient-to-br from-[#b1b8c8] to-[#afb1ca] bg-clip-text">
                      {songs && songs[currentIndex]?.name
                        ? songs[currentIndex].name
                        : ""}
                    </span>
                  </div>
                  {/* artist */}
                  {/* <div className="flex gap-2 text-base text-white md:px-10">
                <div>
                  <span>Artist:</span>
                  <span>
                    {songs && songs[currentIndex]?.artist
                      ? songs[currentIndex]?.artist[0]?.name
                      : ""}
                  </span>
                </div>
              </div> */}
                  {lyricsClicked ? (
                    <div
                      className=" font-semibold md:px-10  text-[#E5E7EB] cursor-pointer bg-gradient-to-l from-[#797dd3] to-[#cbafaf] bg-clip-text text-transparent"
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
                      className="font-semibold md:px-10  text-[#E5E7EB] cursor-pointer bg-gradient-to-l from-[#797dd3] to-[#cbafaf] bg-clip-text text-transparent"
                      onClick={() => setLyricsClicked(!lyricsClicked)}
                    >
                      <div className="flex items-center justify-center gap-5">
                        Show Lyrics{" "}
                        <div>
                          {" "}
                          <CiRead size={25} className="text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <ul className="flex flex-wrap items-center justify-center gap-3 pb-5 text-xs font-thin text-gray-500 md:gap-10 md:text-base md:font-medium dark:text-gray-400 sm:mt-0">
                  <li className="order-2 md:order-1">
                    <button
                      className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                      onClick={previousSong}
                    >
                      {iconShowButtons ? (
                        <GrCaretPrevious size={18} />
                      ) : (
                        "Previous Song"
                      )}
                    </button>
                  </li>
                  <li className="order-3 md:order-2">
                    <button
                      className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                      onClick={backward}
                    >
                      {iconShowButtons ? <MdReplay10 size={18} /> : "Backward"}
                    </button>
                  </li>
                  <li className="flex items-center justify-center order-1 w-full mx-auto my-0 md:w-auto md:block md:px-0 md:order-3">
                    <audio
                      className="text-white bg-black rounded"
                      ref={audioRef}
                      controls
                      width="600px"
                    >
                      {songs && songs[currentIndex] && (
                        <source
                          src={songs[currentIndex]?.autoPath}
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
                      {iconShowButtons ? <MdForward10 size={18} /> : "Forward"}
                    </button>
                  </li>
                  <li className="order-5 md:order-5">
                    <button
                      className="px-2 py-1 border md:px-5 md:py-2 rounded-2xl"
                      onClick={nextSong}
                    >
                      {iconShowButtons ? (
                        <GrCaretNext size={18} />
                      ) : (
                        "Previous Song"
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </span>
      ) : (
        // desktop view
        <span
          style={{
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "fadeIn 1s ease-in " : "fadeOut 1s ease-out",
          }}
        >
          {lyricsClicked && (
            <div className="absolute  md:px-52 w-full h-full px-5 top-10 pt-5 pb-52 overflow-auto rounded-lg mt-10  text-white bg-[#000000]">
              <div className="py-10 bg-black md:w-full rounded-2xl">
                <div className="relative flex flex-col items-center justify-center w-full h-full gap-10">
                  <span className="text-4xl font-bold">Lyrics</span>
                  <span className="w-full h-auto text-sm font-semibold text-center whitespace-pre-wrap md:text-xl md:tracking-widest">
                    {songs && songs[currentIndex]?.lyrics
                      ? songs[currentIndex].lyrics
                      : "No lyrics available"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            className={`fixed w-full md:w-[80%] left-[50%] -translate-x-[50%] border rounded-lg bottom-4`}
          >
            <footer className="bg-[#000000] py2 md:text-xl  text-sm rounded-lg shadow">
              <div className="flex flex-col w-full max-w-screen-xl gap-6 mx-auto md:gap-5 md:p-5 md:justify-center md:items-center">
                <div className="text-[#E5E7EB]   pt-1  justify-center items-center mx-auto md:px-0 gap-10 flex  md:gap-5">
                  {/* song:  */}
                  <div className="flex gap-2 font-semibold text-white md:px-10">
                    <span className="bg-gradient-to-l from-[#5c747e] to-[#c9d4d8] bg-clip-text text-transparent">
                      Song :
                    </span>
                    <span className="text-transparent bg-gradient-to-br from-[#b1b8c8] to-[#afb1ca] bg-clip-text">
                      {songs && songs[currentIndex]?.name
                        ? songs[currentIndex].name
                        : ""}
                    </span>
                  </div>
                  {/* artist */}
                  {/* <div className="flex gap-2 text-base text-white md:px-10">
                <div>
                  <span>Artist:</span>
                  <span>
                    {songs && songs[currentIndex]?.artist
                      ? songs[currentIndex]?.artist[0]?.name
                      : ""}
                  </span>
                </div>
              </div> */}
                  {lyricsClicked ? (
                    <div
                      className=" font-semibold md:px-10  text-[#E5E7EB] cursor-pointer bg-gradient-to-l from-[#797dd3] to-[#cbafaf] bg-clip-text text-transparent"
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
                      className="font-semibold md:px-10  text-[#E5E7EB] cursor-pointer bg-gradient-to-l from-[#797dd3] to-[#cbafaf] bg-clip-text text-transparent"
                      onClick={() => setLyricsClicked(!lyricsClicked)}
                    >
                      <div className="flex items-center justify-center gap-5">
                        Show Lyrics{" "}
                        <div>
                          {" "}
                          <CiRead size={25} className="text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <ul className="flex flex-wrap items-center justify-center gap-3 pb-5 text-xs font-thin text-gray-500 md:gap-10 md:text-base md:font-medium dark:text-gray-400 sm:mt-0">
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
                      {songs && songs[currentIndex] && (
                        <source
                          src={songs[currentIndex]?.autoPath}
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
        </span>
      )}
    </>
  );
};

export default SongPlayer;
