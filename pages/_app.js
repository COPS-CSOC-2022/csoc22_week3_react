import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function success(message)
{
  toast.success(message);
}

export function error(message)
{
  toast.error(message);
}

export function warn(message)
{
  toast.warn(message);
}

export function info(message)
{
  toast.info(message);
}

export const ThemeContext = createContext(null);

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
   <ThemeContext.Provider value={{theme , toggleTheme}} >
    <div className='App' id={theme}>
     <AuthProvider>
     <Nav />
      <div className='switch'>
      <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      <label className={`${theme == 'dark' ? 'text-white' : 'text-dark' }`}> {theme === "light" ? "Light Theme" : "Dark Theme"}</label>
      </div>
      <Component {...pageProps} />
     </AuthProvider>
     <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme = {theme}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
         draggable
         pauseOnHover
        />
    </div>
  </ThemeContext.Provider>
  )
}

export default MyApp;
