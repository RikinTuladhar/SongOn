import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import About from "./pages/About";
import AddSongPage from "./pages/AddSongPage";
import Library from "./pages/Library";
import Artist from "./pages/Artist";
import AddArtist from "./pages/AddArtist";
import AddGenre from "./pages/AddGenre";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        { path: "/addSongs", element: <AddSongPage /> }
        , {path:"/library/:id",element: <Library/>},
        {path:"/artist/:id",element:<Artist/>},
        {path:"/addArtist", element:<AddArtist/>},
        {path:"/addGenre",element:<AddGenre/>}
        
      ],
    }
  ]);

  // console.log(router)

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
