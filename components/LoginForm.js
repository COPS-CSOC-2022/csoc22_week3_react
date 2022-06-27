import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import router, { useRouter } from "next/router";

export default function RegisterForm() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setToken, setToken1 } = useAuth();
  const login = (e) => {
    e.preventDefault();
    // console.log("Yes");
    if (username != "" && password != "") {
      axios
        .post("https://todo-app-csoc.herokuapp.com/auth/login/", {
          username: username,
          password: password,
        })
        .then(({ data }) => {
          console.log(data.token);
          setToken(data.token);
          setToken1(data.token);
          router.push("/");
        })
        .catch((e) => {
          console.log(e);
          alert("Something went wrong");
        });
      /***
       * @todo Complete this function.
       * @todo 1. Write code for form validation.
       * @todo 2. Fetch the auth token from backend and login the user.
       * @todo 3. Set the token in the context (See context/auth.js)
       */
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputUsername"
            id="inputUsername"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
