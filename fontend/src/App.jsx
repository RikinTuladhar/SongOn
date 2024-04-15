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
import PannelProvider, {
  PannelContext,
} from "./contextprovider/PannelProvider";
import Admin from "./pages/Admin/Admin";

import AddSongs from "./components/AddSongs";
import AddArtist from "./components/AddArtist";
import AddArtistPage from "./pages/AddArtistPage";
import AddGenrePage from "./pages/AddGenre";
import EditArtist from "./pages/Admin/pages/EditArtist";
import EditGenre from "./pages/Admin/pages/EditGenre";
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
    { path: "/addArtist", element: <AddArtistPage /> },
    { path: "/addGenre", element: <AddGenrePage /> },
    { path: "/*", element: <NotFound /> },
    {
      path: "/admin",
      element: <Admin />,
      children: [
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
      ],
    },
  ]);

  // console.log(router)

  return (
    <>
      <ReloadProvider>
        <PannelProvider>
          <SongProvider>
            <RouterProvider router={router} />
          </SongProvider>
        </PannelProvider>
      </ReloadProvider>
    </>
  );
}

export default App;
