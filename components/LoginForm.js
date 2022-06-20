import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const { setToken } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    console.log(username);
    console.log(password);

    axios
      .post("auth/login/", {
        username: username,
        password: password,
      })
      .then(function ({ data, status }) {
        console.log(data);
        console.log(status);

        // redirect to home page
        router.push("/");

      })
      .catch(function (error) {
        console.log(error);
        alert("Invalid username or password");
      }
      );



    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
  }

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
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

};