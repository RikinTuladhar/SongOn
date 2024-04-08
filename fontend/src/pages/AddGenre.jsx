import React,{useContext, useRef, useState} from 'react'
import axios from 'axios'
import { SongContext } from '../contextprovider/SongProvider';
const AddGenre = () => {
  const {API} = useContext(SongContext);
    const [genre, setGenre] = useState({
        name: "",
        bio: "",
      });

      const stopPost = useRef();

      const getValues = (event) =>{
        const {name,value} = event.target
        setGenre({...genre,[name]:value});
        
      }
      console.log(genre)

      const handleSubmit = (event)=>{
        event.preventDefault();
        stopPost.current.disabled = true;
        const {name,bio} = event.target

        if(name && bio){
            axios.post(`${API}/addGenre`,genre).then((res)=>{
            if(res){
                alert("Success!")
                setGenre({
                    name: "",
                    bio: "",
                  });
                  stopPost.current.disabled = false;
            }

        }).catch((err)=> console.error(err))
        }
        else{
            alert("Please fill all the fields")
            stopPost.current.disabled = false;
        }
      }
  return (
    <div>
      <div>
        <div className="w-full h-[100vh] bg-slate-500 flex justify-center items-center">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full max-w-sm items-center gap-1.5 p-6 rounded-lg border width center dark:border-gray-800">
                <label className="text-lg font-bold" htmlFor="form-2-name ">
                  Name
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="form-2-name"
                  placeholder="Enter your name"
                  name="name"
                  onChange={getValues}
                  type="text"
                  value={genre.name}
                />

                <label className="text-lg font-bold" htmlFor="form-2-name ">
                  Bio
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="form-2-name"
                  placeholder="Enter Bio"
                  name="bio"
                  type="text"
                  onChange={getValues}
                  value={genre.bio}
                />
                <button type="submit" ref={stopPost}>
                  Add Genre
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGenre
