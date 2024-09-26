import React, { useContext, useEffect, useRef, useState } from "react";
import CardLib from "./CardLib";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
import GenreApi from "../Apis/GenreApi";
import { IoSearch } from "react-icons/io5";
import { GiSouthAfrica } from "react-icons/gi";
const HomeRight = () => {
  const searchRef = useRef();
  const { reload, setReload } = useContext(ReloadContext);
  const [library, setLibrary] = useState([]);
  const { getGenre } = GenreApi();
  const [searchFocus, setSearchFocus] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = (e) => {
    // console.log("typing");
    const searching = e.target.value.toLowerCase().trim();
    const filteredItems = library.filter((item) => {
      return item.name.toLowerCase().includes(searching);
    });
    setFilteredItems(filteredItems);
    // console.log(filteredItems);
    if (searching.length == 0) {
      setSearchFocus(false);
    } else {
      setSearchFocus(true);
    }
  };
  // console.log(searchFocus);

  useEffect(() => {
    getGenre()
      .then((res) => {
        setLibrary(res);
      })
      .catch((err) => {
        console.log("Error is :" + err);
      });
  }, [reload]);

  return (
    <div className=" w-[100%] mb-32 md:mb-0 mx-5 mt-10 md:mx-0  md:w-[80%] h-auto  md:mt-3  py-10 bg-[#11111182] rounded-xl ">
      <div className="flex flex-wrap items-center justify-between w-full px-10 space-y-5">
        <h1 className="text-center md:ml-10 md:text-left text-2xl text-[#E5E7EB] ">
          Genres
        </h1>
        <div className="flex items-center justify-center gap-2 text-white">
          <div>
            <IoSearch size={25} onClick={() => searchRef.current.focus()} />
          </div>
          <div className="text-xl">
            <input
              type="search"
              ref={searchRef}
              onChange={handleSearch}
              className={`w-[95%]  px-5 py-1 text-black rounded-3xl`}
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-3 h-[2px] bg-black  mb-10 "></div>
      <div className="grid items-center justify-center gap-5 overflow-y-auto md:gap-10 md:grid-cols-3 md:m-16">
        {library?.length === 0 || library === undefined ? (
          <>
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  role="status"
                  className="animate-pulse w-52 h-auto px-5  py-2 rounded-md min-h-52 hover:bg-[#1b1b1bd3]  hover:ease-in"
                >
                  <div className="w-full h-[65%] mb-2 ">
                    <svg
                      className="w-[100%] h-24 mb-5 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>

                  <div className="mb-1">
                    <h1 className="text-base font-semibold text-[#E5E7EB]">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    </h1>
                  </div>
                  <div>
                    <span className="text-[#E5E7EB] flex flex-wrap gap-2">
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    </span>
                  </div>
                </div>
              ))}
          </>
        ) : searchFocus === true ? (
          filteredItems?.map((card, id) => (
            <CardLib
              id={card.id}
              name={card.name}
              songlist={card.songs}
              img={card.imgGenre}
            />
          ))
        ) : (
          library?.map((card, id) => (
            <CardLib
              id={card.id}
              name={card.name}
              songlist={card.songs}
              img={card.imgGenre}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeRight;
