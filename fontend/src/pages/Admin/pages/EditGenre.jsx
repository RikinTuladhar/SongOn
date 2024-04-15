import React, { useContext, useEffect, useState } from "react";
import { ReloadContext } from "../../../contextprovider/ReloadProvider";
import GenreApi from "../../../Apis/GenreApi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const EditGenre = () => {
  const { getGenre,deleteGenre } = GenreApi();
  const [genre, setGenre] = useState([]);
  const { reload, setReload } = useContext(ReloadContext);

  useEffect(() => {
    (async () => {
      const res = await getGenre("/genre");
      setGenre(res);
      // console.log(res);
    })();
  }, [reload]);
  const handleDelete = async (id) => {
    // genre/delete/4
    const response = await deleteGenre(`/genre/delete/${id}`);
    setReload(!reload);
    alert(response);
  }
// console.log(reload);
  return (
    <div>
      <div>
        <p className="text-3xl font-bold text-center">Genre List</p>
      </div>
      <div className="mt-16 ml-10 ">
        <div className="flex gap-10 flex-col w-full">
          <div className="w-full relative"><button className="transition ease-in hover:scale-110 absolute bg-slate-600 px-5 rounded-2xl py-1 right-0"> <Link to="/admin/addGenre">Add</Link></button></div>
          <table className="border-collapse  border-spacing-2 border w-full table-auto">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">#</th>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Description</th>
                <th className="border border-gray-200 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {genre.map((g,i) => (
                <tr key={i}>
                  <td className="border text-center px-4 py-2">{(i+1)}</td>
                  <td className="border text-center px-4 py-2">{g.name}</td>
                  <td className="border text-center px-4 py-2">{g.bio}</td>
                  <td className="border flex justify-around px-4 py-2">
                    {" "}
                    <button className="text-xl transition-all ease-in hover:scale-125"><CiEdit /></button>
                    <button onClick={e=>handleDelete(g.id)}  className="text-xl transition-all ease-in hover:scale-125"><MdOutlineDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditGenre;
