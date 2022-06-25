
import { useEffect, useState, useContext, createContext } from 'react';
import { useCookies } from 'react-cookie';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import 'izitoast/dist/css/iziToast.min.css';

import iziToast from 'izitoast/dist/js/iziToast.min.js';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [profileName, setProfileName] = useState('');
  const [avatarImage, setAvatarImage] = useState('#');
  const [cookies, setCookies, removeCookies] = useCookies(['auth']);
  const [token,setTokenState]=useState(cookies.token);

  const setToken = (newToken) => {
    setCookies('token', newToken, { path: '/' });
    setTokenState(newToken);
  };
  const deleteToken = () => {removeCookies('token');
  setTokenState(undefined);
}
  const logout = () => {
    deleteToken();
    router.push('/login');
    
    iziToast.success({
      message:"Logged You Out"
    })
  }

  useEffect(() => {
    if (token) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((response) => {
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          );
          setProfileName(response.data.name);
        })
        .catch((error) => {
          console.log(token);
          console.log('Some error occurred');
        })
    }
  }, [setAvatarImage, setProfileName, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        deleteToken,
        profileName,
        setProfileName,
        avatarImage,
        setAvatarImage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)