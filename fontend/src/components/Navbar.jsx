import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../contextprovider/UserProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOut } from "../Apis/UserSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  // console.log(userDetails);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [hiden, setHiden] = useState(true);
  const { reload, setReload } = useContext(ReloadContext);
  // const { userDetails, token } = useContext(User);
  // console.log(userDetails.username);
  const handeNav = () => {
    setHiden(!hiden);
  };

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    toast(
      userDetails?.username?.length > 0
        ? `Welcome user : '${userDetails?.username
            .charAt(0)
            .toUpperCase()}${userDetails?.username.slice(1)}' to our service`
        : "Welcome User"
    );
  }, [userDetails]);
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth <= 625) {
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
        <nav className="flex items-center justify-around w-full h-auto gap-10 min-h-12 bg-[#090909]">
          <div></div>
          <div></div>
          <div>
            <GiHamburgerMenu
              className="w-5 h-5 text-white"
              onClick={handeNav}
            />
          </div>
          {hiden && (
            <ul
              className={`absolute flex items-center justify-center gap-5 duration-500`}
            >
              <Link className="text-white" to={"/"}>
                Home
              </Link>
              {userDetails?.username?.length > 0 ? (
                <Link
                  to={"/signin"}
                  onClick={(e) => localStorage.removeItem("token")}
                  className="block px-3 py-2 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign Out
                </Link>
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
        <div className="relative bg-black">
          <nav className="z-50 w-full ">
            <div className="flex flex-wrap items-center justify-between w-full max-w-screen-xl p-4 mx-auto text-lg ">
              {/* <div className="text-white">
          //   {userDetails?.username?.length > 0
          //     ? `Welcome user : '${userDetails?.username
          //         .charAt(0)
          //         .toUpperCase()}${userDetails?.username.slice(
          //         1
          //       )}' to our service`
          //     : "Welcome User"}
          // </div> */}
              <ul className="flex items-center justify-between w-full gap-5">
                <div className="flex gap-5">
                  <li>
                    <Link
                      to={"/"}
                      className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/userlibrary"}
                      className="block px-3 py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Your Library
                    </Link>
                  </li>
                </div>

                {/* sign in / sign out  */}
                <li>
                  {userDetails?.username?.length > 0 ? (
                    <Link
                      to={"/signin"}
                      onClick={(e) => {
                        localStorage.removeItem("token");
                        dispatch(logOut());
                      }}
                      className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign Out
                    </Link>
                  ) : (
                    <Link
                      to={"/signin"}
                      className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
