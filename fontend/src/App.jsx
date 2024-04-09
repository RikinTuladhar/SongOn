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
import Practice from "./pages/Practice";
import SongProvider from "./contextprovider/SongProvider";
import ReloadProvider from "./contextprovider/ReloadProvider";
import NotFound from "./pages/NotFound";

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

        ,
        { path: "/library/:id", element: <Library /> },
        { path: "/artist/:id", element: <Artist /> },
      ],
    },
    { path: "/p", element: <Practice /> },
    { path: "/addSongs", element: <AddSongPage /> },
    { path: "/addArtist", element: <AddArtist /> },
    { path: "/addGenre", element: <AddGenre /> },
    {path:"/*" , element:<NotFound/>}
  ]);

  // console.log(router)

  return (
    <>
    <ReloadProvider>
    <SongProvider>
      <RouterProvider router={router} />
      </SongProvider>
      </ReloadProvider>
    </>
  );
}

export default App;
