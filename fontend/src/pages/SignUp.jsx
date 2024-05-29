import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserApi from "../Apis/UserApi";
import OvalLoader from "../components/OvalLoader";
const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    role:"USER"
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const { SignUp } = UserApi();
  const [clicked,setClicked] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true)
    SignUp(data)
      .then((res) => {
        // alert(res);
        setClicked(false)
        navigate("/")
        localStorage.setItem("token", JSON.stringify(res));
      })
      .catch((err) => {
        // alert(err);
        console.log("Error when registering" + err)
        setClicked(false)
      });
  };

  // console.log(data)
  return (
    <div className="bg-[#000000] w-full md:py-[100px] h-auto md:min-h-[100vh] grid place-items-center">
      <main class="flex text-white  items-center  justify-center h-full md:h-screen">
        <form className="px-10 py-10 md:px-0 md:py-0" onSubmit={handleSubmit}>
          <div
            class="rounded-lg bg-[#0f0f0f] border bg-card text-card-foreground shadow-sm w-full max-w-md"
            data-v0-t="card"
          >
            <div class="flex flex-col space-y-1.5 p-6">
              <h3 class="whitespace-nowrap md:py-0 md:px-0 py-2 px-2  text-xl  font-semibold tracking-tight text-2xl">
                Sign Up
              </h3>
              <p class="text-sm md:text-base  text-muted-foreground md:py-0 md:px-0 py-1 px-5">
                Enter email, firstname, lastname and password to create your
                account.
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

                  required=""
                  type="text"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="firstname"
                >
                  First Name
                </label>
                <input
                  class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                  type="text"
                  onChange={handleChange}
                  name="firstname"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="lastname"
                >
                  Last Name
                </label>
                <input
                  class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
               

                  type="text"
                  onChange={handleChange}
                  name="lastname"
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
                  
                  type="password"
                  onChange={handleChange}
                  name="password"
                />
              </div>
            </div>
            <div class="flex flex-col gap-5 items-center p-6">
            <button
              type="submit"
              disabled= {clicked}
              className="flex items-center justify-between gap-2 px-5 py-2 text-xl font-bold break-words duration-500 border rounded-2xl hover:scale-105 hover:bg-white hover:text-black"
            >
             { clicked && <OvalLoader/>}
              <span className="text-sm md:text-xl">Sign up</span>
            </button>
              <div className="text-sm md:text-lg">
                Already have an account ? <Link to={"/signin"} className="text-blue-400 underline">Sign in</Link>
              </div>
              <div>
                <Link to={"/"}>Go back</Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
