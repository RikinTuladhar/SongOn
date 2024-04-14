import axios from 'axios';
import React from 'react'

const GenreApi = () => {
    const baseUrl = "https://songonbackend.onrender.com";
    async function getGenre(endpoint){
        const URL = baseUrl + endpoint;
        console.log(URL)
        const response = await axios.get(URL);
        const data = await response.data;
        return data
        console.log(data)

    }
    return {getGenre}
}

export default GenreApi
