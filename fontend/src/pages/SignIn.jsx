import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../contextprovider/UserProvider";
import UserApi from "../Apis/UserApi";
import OvalLoader from "../components/OvalLoader";

const SignIn = () => {
  const { setToken, setUserDetails } = useContext(User);
  const navigate = useNavigate();
  const buttonRef = useRef();
  const [clicked, setClicked] = useState(false);
  const { SignIn } = UserApi();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true);
    // alert("clicked");
    SignIn(data)
      .then((res) => {
        // alert(res);
        setUserDetails(res);
        // console.log(res);
        const { role } = res;
        if (role === "USER") {
          navigate("/");
        } else {
          navigate("/admin");
        }
        // setToken(res);

        // localStorage.setItem("token", JSON.stringify(res));
        setClicked(false);
      })
      .catch((err) => {
        // alert(err);
        console.log("error when signing in" + err);
        setClicked(false);
      });
  };
  return (
    <main class="flex text-white  items-center bg-[#000000] justify-center h-auto md:h-screen">
      <form className="px-10 py-10 md:px-0 md:py-0" onSubmit={handleSubmit}>
        <div
          class="rounded-lg  bg-[#0f0f0f] border bg-card text-card-foreground shadow-sm w-full max-w-md"
          data-v0-t="card"
        >
          <div class="flex flex-col space-y-1.5  md:p-6">
            <h3 class="  whitespace-nowrap font-semibold md:py-0 md:px-0 py-2 px-2 tracking-tight text-center md:text-left text-xl md:text-2xl">
              Login
            </h3>
            <p class="text-sm md:text-base text-muted-foreground md:py-0 md:px-0 py-1 px-5">
              Enter your email and password to access your account.
            </p>
          </div>
          <div class="p-6 space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="username"
              >
                Username
              </label>
              <input
                class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                required=""
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="password"
              >
                Password
              </label>
              <input
                class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                required=""
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="flex flex-col gap-5 items-center p-6">
            <button
              disabled={clicked}
              type="submit"
              className="flex items-center justify-between gap-2 px-5 py-2 text-xl font-bold break-words duration-500 border rounded-2xl hover:scale-105 hover:bg-white hover:text-black"
            >
              {clicked && <OvalLoader />}
              <span className="text-sm md:text-xl">Sign in</span>
            </button>
            <div className="text-sm md:text-lg">
              Do no have an account ?{" "}
              <Link to={"/signup"} className="text-blue-400 underline">
                Sign up
              </Link>
            </div>
            <div>
              <Link to={"/"}>Go back</Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};
export default SignIn;
