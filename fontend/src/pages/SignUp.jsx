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
    email: "",
    role: "USER",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const { SignUp } = UserApi();
  const [clicked, setClicked] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setClicked(true)
  //   SignUp(data)
  //     .then((res) => {
  //       // alert(res);
  //       setClicked(false)
  //       // console.log(res)
  //       if(res === 400) {
  //         alert(res)
  //         return;
  //       }
  //       alert(res);
  //       // navigate("/")
  //     })
  //     .catch((err) => {
  //       // alert(err);
  //       console.log("Error when registering" + err)
  //       setClicked(false)
  //     });
  // };

  // console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(true);
    SignUp(data)
      .then((res) => {
        setClicked(false);
        alert(res); // Successful registration message
        navigate("/signIn");
      })
      .catch((err) => {
        // console.log(err.message)
        // console.log("Error when registering: " + err.message);
        // message from thorw new Error();
        alert(err.message);
        setClicked(false);
      });
  };
  function handleUserName(e) {
    let username = e.target.value;
    if (username.length <= 0 || username.length > 20) {
      setUserNameMessage(true);
    } else {
      setUserNameMessage(false);
    }
    setData({ ...data, username: username });
  }

  function handleEmail(e) {
    console.log("Email :" + e.target.value);
    var email = e.target.value;
    console.log(email.length);
    if (validEmail(email)) {
      setEmailMessage(false);
      setData({ ...data, email: email });
    } else {
      setEmailMessage(true);
    }
    if (email.length <= 0) {
      setEmailMessage(false);
    }
  }

  function validEmail(email) {
    var reg = /^[A-Za-z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return reg.test(email);
  }

  return (
    <div className="bg-[#000000] w-full md:py-[100px] h-auto md:min-h-[100vh] grid place-items-center">
      <main className="flex items-center justify-center h-full text-white md:h-screen">
        <form className="px-5 py-10 md:px-0 md:py-0" onSubmit={handleSubmit}>
          <div
            className="rounded-lg bg-[#0f0f0f] border bg-card text-card-foreground shadow-sm w-full max-w-md"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="px-2 py-2 text-2xl font-semibold tracking-tight whitespace-nowrap md:py-0 md:px-0">
                Sign Up
              </h3>
              <p className="px-5 py-1 text-sm md:text-base text-muted-foreground md:py-0 md:px-0">
                Enter email, firstname, lastname and password to create your
                account.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="space-x-10 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="username"
                >
                  <span>Username</span>{" "}
                  <span className="font-bold text-red-500">
                    {userNameMessage && "Invalid username"}
                  </span>
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required=""
                  type="text"
                  name="username"
                  onChange={handleUserName}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="space-x-10 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="username"
                >
                  <span>Email</span>{" "}
                  <span className="font-bold text-red-500">
                    {emailMessage && "Invalid email format"}
                  </span>
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required=""
                  type="text"
                  name="email"
                  onChange={handleEmail}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  onChange={handleChange}
                  name="firstname"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  onChange={handleChange}
                  name="lastname"
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
                  type="password"
                  onChange={handleChange}
                  name="password"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 p-6">
              <button
                type="submit"
                disabled={clicked}
                className="flex items-center justify-between gap-2 px-5 py-2 text-xl font-bold break-words duration-500 border rounded-2xl hover:scale-105 hover:bg-white hover:text-black"
              >
                {clicked && <OvalLoader />}
                <span className="text-sm md:text-xl">Sign up</span>
              </button>
              <div className="text-sm md:text-lg">
                Already have an account ?{" "}
                <Link to={"/signin"} className="text-blue-400 underline">
                  Sign in
                </Link>
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
