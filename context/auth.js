import { useEffect, useState, useContext, createContext } from 'react'
import axios from '../utils/axios'
import { ToastContainer, toast } from 'react-toastify';
import authRequired from '../middlewares/auth_required'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const token = cookies.token

  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')
  const logout = () => {
    deleteToken()
    router.reload()
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
          )
          setProfileName(response.data.name)
        })
        .catch((error) => {
          console.log('Some error occurred')
        })
    }
  }, [setAvatarImage, setProfileName, token])

  return (
    <>
    <ToastContainer />
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
    </>
  )
}

export const useAuth = () => useContext(AuthContext)
