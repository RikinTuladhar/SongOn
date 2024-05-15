import axios from 'axios';
import React from 'react'

const GenreApi = () => {
    const baseUrl = "https://songonbackend.onrender.com";
    
    async function getGenre(){
        const URL = baseUrl + "/genre";
        console.log(URL)
        const response = await axios.get(URL);
        const data = await response.data;
        return data
        console.log(data)

    }

    async function postGenre(value){
        const URL = baseUrl + "/addGenre";
        console.log(URL)
        const response = await axios.post(URL,value);
        const data = await response.data;
        return data
        console.log(data)

    }

    async function deleteGenre(endpoint){
        const URL = baseUrl + endpoint;
        // console.log(URL)
        const response = await axios.delete(URL);
        const data = await response.data;
        return data;
    }
   
    async function getGenreById(id){
        const URL = baseUrl + `/by-genre/${id}`;
        console.log(URL)
        const response = await axios.get(URL);
        const data = await response.data;
        console.log(data)
        return data
     
    }

    return {getGenre,deleteGenre,getGenreById,postGenre}
}

export default GenreApi
