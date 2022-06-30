import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'
import { API_URL } from '../utils/constants'
import { success } from '../pages/_app'
import { authRequired } from '../middlewares/auth_required'
import { noAuthRequired } from '../middlewares/no_auth_required'


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const [token , updateToken] = useState(cookies.token);
  
  authRequired(token);
  noAuthRequired(token);

  const setToken = (newToken) =>{ setCookies('token', newToken, { path: '/' }) ; updateToken(newToken); }
  const deleteToken = () => removeCookies('token')
  
  const logout = () => {
    deleteToken();
    updateToken(undefined);
    router.replace('/login')
    success('Logged out successfully .')
  }

 

  useEffect(() => {
    if (token) {
      axios({
        headers: {
            Authorization: "Token " + token,
        },
        url: API_URL + 'auth/profile/',
        method: 'get',
          })
        .then((response) => {
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          )
          setProfileName(response.data.name.split(' ')[0]);
        })
        .catch((error) => {
          console.log('Some error occurred')
        })
    }
  }, [setAvatarImage, setProfileName, token])

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
