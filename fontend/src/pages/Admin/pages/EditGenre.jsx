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
    const ok =  confirm("Are you sure you want to delete?")
    if(ok){
      const response = await deleteGenre(`/genre/delete/${id}`);
      setReload(!reload);
      alert("Deleted Genre");
    }else{
      return;
    }
  
  }
// console.log(reload);
  return (
    <div>
      <div>
        <p className="text-3xl font-bold text-center">Genre List</p>
      </div>
      <div className="mt-16 ml-10 ">
        <div className="flex flex-col w-full gap-10">
          <div className="relative w-full"><button className="absolute right-0 px-5 py-1 transition ease-in hover:scale-110 bg-slate-600 rounded-2xl"> <Link to="/admin/addGenre">Add</Link></button></div>
          <table className="w-full border border-collapse table-auto border-spacing-2">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-200">#</th>
                <th className="px-4 py-2 border border-gray-200">Name</th>
                <th className="px-4 py-2 border border-gray-200">Description</th>
                <th className="px-4 py-2 border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {genre.map((g,i) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-center border">{(i+1)}</td>
                  <td className="px-4 py-2 text-center border">{g.name}</td>
                  <td className="px-4 py-2 text-center border">{g.bio}</td>
                  <td className="flex justify-around px-4 py-2 border">
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
