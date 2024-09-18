import React, { useEffect, useState } from "react";

const CustomAlert = ({ message }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [message]);
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } absolute border top-2 w-[20ppx] translate-x-[-50%] translate-y-[50%] left-[50%] h-[100px] bg-black text-white`}
    >
      Meesage is
      {message}
    </div>
  );
};

export default CustomAlert;
