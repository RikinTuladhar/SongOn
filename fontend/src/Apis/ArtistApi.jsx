import axios from 'axios';
import React from 'react'

const ArtistApi = () => {
    const baseUrl = "https://songonbackend.onrender.com"

        async function getArtist(endpoint){
        const URL = baseUrl + endpoint;
            try {
            const response = await  axios.get(URL)
            const data = await response.data;
            console.log(data);
            return data;
            } catch (error) {
                console.error(error)
            } 
        
    }


  return {getArtist}
}

export default ArtistApi
