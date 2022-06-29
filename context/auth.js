import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const token = cookies.token
  const [token_1,setToken_1] = useState(cookies.token);
  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')
  const logout = () => {
    toast.success('Logged Out Successfully', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    localStorage.removeItem('token')
    setToken_1(undefined)
    deleteToken()
    setAvatarImage('#')
    setProfileName('')
    router.push('/login')
  }

  useEffect(() => {
    if (token_1) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
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
  }, [setAvatarImage, setProfileName,token_1])

  return (
    <AuthContext.Provider
      value={{
        token,
        token_1,
        setToken,
        setToken_1,
        deleteToken,
        profileName,
        setProfileName,
        avatarImage,
        setAvatarImage,
        logout,
      }}
    >
      {children}
      <ToastContainer/>
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
