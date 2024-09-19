import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../contextprovider/UserProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOut } from "../Apis/UserSlice";
import { IoLogOutOutline } from "react-icons/io5";
const Navbar = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);

  // console.log(userDetails);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [hiden, setHiden] = useState(true);
  const handeNav = () => {
    setHiden(!hiden);
  };

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    // toast(
    //   userDetails?.username?.length > 0
    //     ? `Welcome user : '${userDetails?.username
    //         .charAt(0)
    //         .toUpperCase()}${userDetails?.username.slice(1)}' to our service`
    //     : "Welcome User"
    // );
  }, [userDetails]);
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth <= 825) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {mobileView === true ? (
        <nav className="flex flex-col py-5 items-center justify-around w-full h-auto gap-10 min-h-12 bg-[#090909]">
          <div>
            <GiHamburgerMenu
              className="w-5 h-5 text-white"
              onClick={handeNav}
            />
          </div>
          {hiden && (
            <ul>
              {userDetails?.username?.length > 0 ? (
                <div>
                  <Link
                    className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    to={"/"}
                  >
                    Home
                  </Link>
                  <Link
                    to={`/userlibrary/${userDetails.username}`}
                    className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Your Library
                  </Link>
                  <Link
                    to={`/groupchat`}
                    className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Group Chat
                  </Link>
                  <Link
                    to={`/algorithm`}
                    className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Recommendations
                  </Link>
                  <Link
                    to={"/signin"}
                    onClick={(e) => {
                      //there is case for logout that hanbdles the user state.
                      dispatch(logOut());
                    }}
                    className="flex gap-5 px-3 py-2 text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Log out
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/signin"}
                  className="block px-3 py-2 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign in
                </Link>
              )}
            </ul>
          )}
        </nav>
      ) : (
        //desktop view
        <div className="relative bg-black">
          <nav className="z-50 w-full ">
            <div className="flex flex-wrap items-center justify-between w-full max-w-screen-xl p-4 mx-auto text-lg ">
              <ul className="flex items-center justify-between w-full gap-5">
                <div className="flex gap-5">
                  <li>
                    <Link
                      to={"/"}
                      className="block px-3 py-2 text-white rounded md:bg-transparent md:p-0 dark:text-white "
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  {userDetails.role == "USER" && (
                    <>
                      <li>
                        <Link
                          to={`/userlibrary/${userDetails.username}`}
                          className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Your Library
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/groupchat`}
                          className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Group Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/algorithm`}
                          className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Recommendations
                        </Link>
                      </li>
                    </>
                  )}
                </div>

                {/* sign in / sign out  */}
                <li>
                  {userDetails?.username?.length > 0 ? (
                    <Link
                      to={"/signin"}
                      onClick={(e) => {
                        //there is case for logout that hanbdles the user state.
                        dispatch(logOut());
                      }}
                      className="block px-3 py-2 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <IoLogOutOutline size={30} />
                    </Link>
                  ) : (
                    <Link
                      to={"/signin"}
                      className="block px-3 py-2 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign in
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
