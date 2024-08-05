import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser, logOut } from "../../../Apis/UserSlice/";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { CgInsertAfterO } from "react-icons/cg";
import { RiLogoutBoxFill } from "react-icons/ri";
const SideBar = () => {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  // console.log(userDetails);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const handleClick = () => {
    setHide(!hide);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={handleClick}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to={"/admin"} className="flex ms-2 md:me-24">
                <img
                  src="./songon.png"
                  onError={e=> e.target.src="/songon.png"}
                  className="h-8 me-3"
                  alt="Music Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Music On
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`${
          hide === false ? "block" : "hidden"
        }   sm:translate-x-0 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/admin"}
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              {/* addsong  */}
              <Link
                to={"/admin/addSongs"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdAddCircle size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">Add Song</span>
              </Link>
            </li>
            {/* add artist  */}
            <li>
              <Link
                to={"/admin/addArtist"}
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdAddCircle size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">AddArtist</span>
              </Link>
            </li>
            {/* add genre  */}
            <li>
              <Link
                to={"/admin/addGenre"}
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdAddCircle size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">AddGenre</span>
              </Link>
            </li>
            {/* edit artist  */}
            <li>
              <Link
                to={"/admin/edit/artist"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                 <FaEdit size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">Edit Artist</span>
              </Link>
            </li>
            {/* edit genre  */}
            <li>
              <Link
                to={"/admin/edit/genre"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <FaEdit size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">Edit Genre</span>
              </Link>
            </li>
            {/* edit song  */}
            <li>
              <Link
                to={"/admin/edit/song"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <FaEdit size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">Edit Song</span>
              </Link>
            </li>

            {/* add song in artist  */}
            {/* <li>
              <Link
                to={"/admin/addSongInArtist"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CgInsertAfterO size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Song in Artist
                </span>
              </Link>
            </li> */}
            {/* add song in gerne  */}
            {/* <li>
              <Link
                to={"/admin/addSongInGenre"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
             <CgInsertAfterO size={25}/>
                <span className="flex-1 ms-3 whitespace-nowrap">Song in Genre</span>
              </Link>
            </li> */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiLogoutBoxFill  size={25}/>
                <Link
                  to={"/signin"}
                  className="flex-1 ms-3 whitespace-nowrap"
                  onClick={(e) => {
                    //there is case for logout that hanbdles the user state.
                    dispatch(logOut());
                  }}
                >
                  Sign out
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
