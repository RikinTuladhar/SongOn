import { data } from "autoprefixer";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ReloadContext } from "../contextprovider/ReloadProvider";
const SongPlayer = () => {
  const { reload, setReload } = useContext(ReloadContext);

  const [dota, setData] = useState([]);
  const [audioSources, setaudioSources] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/songs")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        console.log(res);
        setData(res);
        const paths = res.map((song) => song.autoPath);
        setaudioSources(paths);
      });
  }, [reload]);

  console.log(audioSources);
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
  console.log(audioSources[currentIndex]);
  return (
    <div className="fixed bottom-4">
      <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4">
          <ul class="flex flex-wrap gap-16 justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <button className="border px-5 py-2 rounded-2xl" onClick={previousSong}>Previous Song</button>
            </li>
            <li>
              <button className="border px-5 py-2 rounded-2xl" onClick={backward}>Backward</button>
            </li>
            <li>
              <audio ref={audioRef} autoPlay controls width="600px">
                <source src={audioSources[currentIndex]} type="video/mp4" />
              </audio>
            </li>

            <li>
              <button className="border px-5 py-2 rounded-2xl" onClick={nextSong}>Next Song</button>
            </li>

            <li>
              <button className="border px-5 py-2 rounded-2xl" onClick={forward}>Forward</button>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default SongPlayer;
