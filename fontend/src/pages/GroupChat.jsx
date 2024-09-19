import React, { useEffect, useState, useRef } from "react";
import { app } from "../firebase";
import GenreApi from "../Apis/GenreApi";
import { IoIosSend } from "react-icons/io";
import {
  getFirestore,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { GiLoveSong } from "react-icons/gi";
const db = getFirestore(app);

const GroupChat = () => {
  const user = useSelector((state) => state?.user?.userDetails);
  const { getGenre, getSongByGenreId } = GenreApi();

  // Reference for the message box
  const messageBoxRef = useRef(null);

  // All the messages
  const [message, setMessages] = useState([]);
  // Current message to send
  const [newMessage, setNewMessage] = useState("");
  const [genres, setGenres] = useState([]);
  const [chatGenre, setChatGenre] = useState("message");
  const [chatGenreId, setChatGenreId] = useState();
  const [showPlayList, setShowPlayList] = useState(false);
  const [playList, setPlayList] = useState([]);
  const [audioToSend, setAudioToSend] = useState({
    name: "",
    autoPath: "",
  });

  useEffect(() => {
    const q = query(collection(db, chatGenre), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [chatGenre]);

  useEffect(() => {
    getGenre()
      .then((res) => {
        setGenres(res);
      })
      .catch((err) => console.log(err));
  }, [chatGenre]);

  useEffect(() => {
    setPlayList("");
    getSongByGenreId(chatGenreId)
      .then((res) => {
        setPlayList(res);
      })
      .catch((err) => {
        setPlayList("");
        console.log(err);
      });
  }, [chatGenre]);

  // Automatically scroll to the bottom of the message box whenever a new message is added
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [message]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = {
      uid: user.id,
      displayName: user.username,
      text: newMessage,
      timestamp: serverTimestamp(),
      audio: false,
    };
    await addDoc(collection(db, chatGenre), data);
    setNewMessage("");
  };

  const sendAudio = async (e) => {
    e.preventDefault();
    const data = {
      uid: user.id,
      displayName: user.username,
      text: newMessage,
      audioName: audioToSend.name,
      url: audioToSend.autoPath,
      timestamp: serverTimestamp(),
      audio: true,
    };
    await addDoc(collection(db, chatGenre), data);
    setShowPlayList(false);
    setNewMessage("");
  };

  const changeChatGroup = (id, chatName) => {
    setChatGenre(chatName);
    setChatGenreId(id);
  };

  return (
    <>
      <Navbar />
      <div className="w-full px-16 md:px-52  pb-20 md:pb-0 flex-wrap h-[auto] min-h-min gap-10 md:gap-0 md:h-[100vh] text-white bg-[#080808] flex justify-center items-center">
        <div className="w-full md:w-[30%] rounded-tl-2xl rounded-bl-2xl h-[80vh] bg-[#161616] p-5">
          {/* Left side */}
          <div className="flex flex-col w-full p-2 rounded-2xl h-[75vh] overflow-y-auto bg-[#0f0f0f]">
            <div className="flex flex-col mt-5 ml-2 gap-y-5">
              <div className="text-2xl font-bold">List of Groups</div>
              <div className="w-full h-[0.1rem] bg-slate-50"></div>
              <div
                className="text-base font-bold cursor-pointer"
                onClick={(e) => {
                  setChatGenre("message");
                  changeChatGroup(0, "message");
                }}
              >
                All Chat
              </div>
              {genres &&
                genres.map((genre, i) => (
                  <>
                    {chatGenre === genre.name ? (
                      <div
                        onClick={(e) => changeChatGroup(genre.id, genre.name)}
                        className="w-full px-2 py-1 text-base bg-[#545555] border rounded-lg cursor-pointer"
                      >
                        #{i + 1} {genre?.name}
                      </div>
                    ) : (
                      <div
                        onClick={(e) => changeChatGroup(genre.id, genre.name)}
                        className="px-2 py-1 text-base border rounded-lg cursor-pointer"
                      >
                        #{i + 1} {genre?.name}
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full  md:w-[70%] rounded-tr-2xl rounded-br-2xl px-3  md:h-[80vh] bg-[#0f0f0f]">
          <div className="relative w-full">
            <div className="py-2 text-2xl text-center">
              <h3>Group Chat: #{chatGenre}</h3>
              <div className="w-full mt-2 h-[0.1rem] bg-slate-50"></div>
            </div>
            <div
              ref={messageBoxRef} // Reference the message box container
              className="w-full relative space-y-3 pb-5 px-2 pt-3 h-[62vh] overflow-y-auto message-box"
            >
              {message.length > 0 ? (
                <div className="space-y-3">
                  {message.map((msg) => (
                    // other message
                    <div
                      key={msg.id}
                      className={`flex  flex-wrap gap-3 message px-3 py-2 rounded-xl ${
                        user?.username === msg?.data?.displayName
                          ? "justify-start flex-row-reverse bg-[#222222]"
                          : "justify-start bg-[#516aa8]"
                      }`}
                    >
                      {/* self message */}
                      <div className="font-extrabold">
                        {user?.username === msg.data.displayName
                          ? ""
                          : msg.data.displayName}
                      </div>
                      <div className="flex flex-col flex-wrap gap-2 text-center">
                        <div className="font-semibold">{msg?.data?.text}</div>
                        {msg.data.audio === true && (
                          <div className="flex flex-wrap items-center justify-center gap-5 space-x-5">
                            <span>Song Name : {msg.data.audioName}</span>{" "}
                            <audio controls src={`${msg.data.url}`}></audio>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="absolute text-red-300 font-semibold text-center bottom-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%]">
                  No messages
                </div>
              )}
            </div>
            <div className="flex w-full pb-2 mt-1 space-x-3 justify-evenly">
              <button
                onClick={(e) => setShowPlayList(!showPlayList)}
                className="px-2 py-2 mx-1 border rounded-full m-[10px]"
              >
                <GiLoveSong size={25} />
              </button>
              {showPlayList && (
                <select
                  onChange={(e) =>
                    setAudioToSend({
                      name: e.target.options[e.target.selectedIndex].text,
                      autoPath: e.target.value,
                    })
                  }
                  className="px-2 m-[10px] text-black rounded-full"
                >
                  <option disabled selected>
                    Select Song
                  </option>
                  {playList &&
                    playList.map((playlist) => (
                      <option
                        key={playlist.autoPath}
                        value={playlist.autoPath}
                        className="text-black rounded-2xl"
                      >
                        {playlist.name}
                      </option>
                    ))}
                </select>
              )}
              <form
                className="flex w-full py-2 space-x-2"
                onSubmit={showPlayList === true ? sendAudio : sendMessage}
              >
                <input
                  type="text"
                  placeholder="Enter Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="text-black w-[90%] px-2 py-2 rounded-lg border"
                  required
                />{" "}
                <button
                  type="submit"
                  className="border px-2 py-2 bg-[#2b2b2b] text-white rounded-full"
                >
                  <IoIosSend size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
