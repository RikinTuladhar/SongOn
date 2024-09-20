import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, logOut } from "../Apis/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);

  const [mobileView, setMobileView] = useState(window.innerWidth <= 525);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 525);
    };

    window.addEventListener("resize", handleResize);

    // Initial check for mobile/desktop view on mount
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
      {mobileView ? (
        // Mobile view
        <nav className="flex flex-col py-5 items-center justify-around w-full h-auto gap-10 bg-[#090909]">
          <GiHamburgerMenu
            className="w-5 h-5 text-white"
            onClick={toggleMenu}
          />
          {menuOpen && (
            // mobile view
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              {userDetails?.username && (
                <>
                  <li>
                    <Link
                      to={`/userlibrary/${userDetails.username}`}
                      className="text-white"
                    >
                      Your Library
                    </Link>
                  </li>
                  <li>
                    <Link to="/groupchat" className="text-white">
                      Group Chat
                    </Link>
                  </li>
                  <li>
                    <Link to="/algorithm" className="text-white">
                      Recommendations
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile" className="text-white">
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signin"
                      onClick={() => dispatch(logOut())}
                      className="flex items-center gap-2 text-white"
                    >
                      Log out
                    </Link>
                  </li>
                </>
              )}
              {!userDetails?.username && (
                <li>
                  <Link to="/signin" className="text-white">
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          )}
        </nav>
      ) : (
        // Desktop view
        <nav className="p-4 bg-black">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <ul className="flex gap-6 text-white">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              {userDetails?.role === "USER" && (
                <>
                  <li>
                    <Link
                      to={`/userlibrary/${userDetails.username}`}
                      className="text-white"
                    >
                      Your Library
                    </Link>
                  </li>
                  <li>
                    <Link to="/groupchat" className="text-white">
                      Group Chat
                    </Link>
                  </li>
                  <li>
                    <Link to="/algorithm" className="text-white">
                      Recommendations
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile" className="text-white">
                      Your Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div>
              {userDetails?.username ? (
                <Link
                  to="/signin"
                  onClick={() => dispatch(logOut())}
                  className="flex items-center gap-2 text-white"
                >
                  <IoLogOutOutline size={30} />
                  Log out
                </Link>
              ) : (
                <Link to="/signin" className="text-white">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
