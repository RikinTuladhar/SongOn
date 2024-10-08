import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import About from "./pages/About";
import AddSongPage from "./pages/AddSongPage";
import Library from "./pages/Library";
import Artist from "./pages/Artist";
import AddGenre from "./components/AddGenre";
import Practice from "./pages/Practice";
import SongProvider from "./contextprovider/SongProvider";
import ReloadProvider from "./contextprovider/ReloadProvider";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin/Admin";

import AddSongs from "./components/AddSongs";
import AddArtist from "./components/AddArtist";
import AddArtistPage from "./pages/AddArtistPage";
import AddGenrePage from "./pages/AddGenre";
import EditArtist from "./pages/Admin/pages/EditArtist";
import EditGenre from "./pages/Admin/pages/EditGenre";
import EditSong from "./pages/Admin/pages/EditSong";
import AddSongInGenre from "./components/AddSongInGenre";
import AddSongInArtist from "./components/AddSongInArtist";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProvider from "./contextprovider/UserProvider";
import UserLibrary from "./pages/UserLibrary";
import EditArtistPanel from "./pages/Admin/subpage/EditArtistPanel";
import EditSongPanel from "./pages/Admin/subpage/EditSongPanel";
import EditGenrePanel from "./pages/Admin/subpage/EditGenrePanel";
import GroupChat from "./pages/GroupChat";
import Recommendation from "./pages/Recommendation";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Admin/pages/Dashboard"

function App() {
  const router = createBrowserRouter([
    //user view components
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
    { path: "/algorithm", element: <Recommendation /> },
    { path: "/user-profile", element: <UserProfile /> },
    //solo components
    { path: "/p", element: <Practice /> },
    { path: "/addSongs", element: <AddSongPage /> },
    { path: "/addArtist", element: <AddArtistPage /> },
    { path: "/addGenre", element: <AddGenrePage /> },
    { path: "/signIn", element: <SignIn /> },
    { path: "/signUp", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
    { path: "/userlibrary/:username", element: <UserLibrary /> },
    { path: "/groupchat", element: <GroupChat /> },

    //admin components
    {
      path: "/admin",
      element: <Admin />,

      children: [
        {
          path: "/admin",
          element: < Dashboard/>,
        },
        {
          path: "/admin/addSongs",
          element: <AddSongs />,
        },
        {
          path: "/admin/addArtist",
          element: <AddArtist />,
        },
        {
          path: "/admin/addGenre",
          element: <AddGenre />,
        },
        {
          path: "/admin/edit/artist",
          element: <EditArtist />,
        },
        {
          path: "/admin/edit/genre",
          element: <EditGenre />,
        },
        {
          path: "/admin/edit/song",
          element: <EditSong />,
        },
        { path: "/admin/addSongInGenre", element: <AddSongInGenre /> },
        { path: "/admin/addSongInArtist", element: <AddSongInArtist /> },

        { path: "/admin/editSong/:id", element: <EditSongPanel /> },
        { path: "/admin/editArtist/:id", element: <EditArtistPanel /> },
        { path: "/admin/editGenre/:id", element: <EditGenrePanel /> },
      ],
    },
  ]);

  // console.log(router)

  return (
    <>
      <ReloadProvider>
        <UserProvider>
          <SongProvider>
            <RouterProvider router={router} />
          </SongProvider>
        </UserProvider>
      </ReloadProvider>
    </>
  );
}

export default App;
