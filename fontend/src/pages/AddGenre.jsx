import React,{useContext, useRef, useState} from 'react'
import axios from 'axios'
import { SongContext } from '../contextprovider/SongProvider';
import Navbar from '../components/Navbar';
import Ag from "../components/AddGenre";
const AddGenre = () => {
 
  return (
    <div>
      <Navbar/>
      <Ag/>
    </div>
  )
}

export default AddGenre
