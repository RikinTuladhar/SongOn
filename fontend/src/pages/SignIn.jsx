import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../contextprovider/UserProvider";
import UserApi from "../Apis/UserApi";
import OvalLoader from "../components/OvalLoader";
import { useDispatch } from "react-redux";
import { signIn } from "../Apis/UserSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const dispatch = useDispatch();
  // const { setToken, setUserDetails } = useContext(User);
  const navigate = useNavigate();
  const buttonRef = useRef();
  const [clicked, setClicked] = useState(false);
  const { SignIn } = UserApi();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // console.log(data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    setTimeout(async () => {
      try {
        const resultAction = await dispatch(signIn(data)).unwrap();
        // Handle success: resultAction contains the user details
        // setUserDetails(resultAction);
        // console.log(resultAction);
        const { username, role } = resultAction;
        // console.log(role);
        if (role === "USER") {
          toast.success("Welcome To Music-On " + username);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.success("Welcome To Music-On Admin " + username);
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        }
      } catch (error) {
        // Handle error
        toast.error(error.message);
        console.log("Error when signing in: ", error);
      } finally {
        setClicked(false);
      }
    }, 2000);
  };

  return (
    <main className="flex h-auto min-h-[100vh]   md:py-10 md:px-10 text-white items-center bg-[#000000] justify-center  ">
       <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <form className="px-5 py-10 md:px-0 md:py-0" onSubmit={handleSubmit}>

        <div
          className="rounded-lg bg-[#0f0f0f] border bg-card text-card-foreground shadow-sm w-full max-w-md"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 md:p-6">
            <h3 className="px-2 py-2 text-xl font-semibold tracking-tight text-center whitespace-nowrap md:py-0 md:px-0 md:text-left md:text-2xl">
              Sign In
            </h3>
            <p className="px-5 py-1 text-sm md:text-base text-muted-foreground md:py-0 md:px-0">
              Enter your email and password to access your account.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="flex w-full h-10 px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="username"
                required
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex w-full h-10 px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                required
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 p-6">
            <button
              disabled={clicked}
              type="submit"
              className="flex items-center justify-between gap-2 px-5 py-2 text-xl font-bold break-words duration-500 border rounded-2xl hover:scale-105 hover:bg-white hover:text-black"
            >
              {clicked && <OvalLoader />}
              <span className="text-sm md:text-xl">Sign in</span>
            </button>
            <div className="text-sm md:text-lg">
              Do not have an account?{" "}
              <Link to="/signup" className="text-blue-400 underline">
                Sign up
              </Link>
            </div>
            <div>
              <Link to="/">Go back</Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
