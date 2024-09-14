import React, { useEffect, useState } from "react";
import { app } from "../firebase";
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

const db = getFirestore(app);

const GroupChat = () => {
  const user = useSelector((state) => state?.user?.userDetails);

  console.log(user);

  //all the messages
  const [message, setMessages] = useState([]);
  //current message send
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  console.log(message);
  const sendMessage = async () => {
    var data = {
      //from google auth
      uid: user.id,
      displayName: user.username,
      //recently typed message
      text: newMessage,
      timestamp: serverTimestamp(),
    };
    //to store in database
    //database name , data to send
    await addDoc(collection(db, "message"), data);
    setNewMessage("");
  };

  console.log(user);
  return (
    <>
      <Navbar />
      <div className="w-full px-52 h-[100vh] text-white bg-[#161616] flex justify-center items-center">
        <div className="w-[30%] h-[80vh] bg-red-400">
          <div>Logged In as {user?.username} </div>
        </div>

        <div className="w-[70%] h-[80vh] bg-yellow-300">
          <div className="relative w-full">
            <div className="py-2 text-2xl text-center">
              <h3>Group Chat</h3>
            </div>
            <div className="w-full space-y-1 px-2 pt-3 h-[65vh] overflow-y-auto bg-purple-300 message-box">
              {message.map((msg) => (
                <div
                  key={msg.id}
                  className={`message px-3 py-2 rounded-2xl  ${
                    user?.username === msg.data.displayName
                      ? "justify-start bg-[#535bf2]"
                      : "justify-end bg-[#516aa8]"
                  }`}
                >
                  <div className="font-extrabold">{msg.data.displayName}</div>
                  <div className="font-semibold">{msg?.data?.text}</div>
                </div>
              ))}
            </div>
            <div className="flex w-full mt-1 bg-green-400 justify-evenly ">
              <input
                type="text"
                onChange={(e) => setNewMessage(e.target.value)}
                className="text-black w-[70%] px-2 py-2 rounded-lg border"
              />{" "}
              <button
                onClick={sendMessage}
                className="px-3 py-3 rounded-2xl bg-slate-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
