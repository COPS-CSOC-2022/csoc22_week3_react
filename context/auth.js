import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  // const token = cookies.token
  const [token1, setToken1] = useState(cookies.token)
  console.log(token1);
  const setToken =(newToken) => {setCookies('token', newToken, { path: '/' })}
  const deleteToken = () => {
    removeCookies('token')
  }
   const logout = async() => {
    setProfileName('')
    setAvatarImage('#')
     setToken1(null)
     deleteToken()
    router.push('/login')
  }
  console.log(cookies);
  const [flag, setFlag] = useState(false)
  
  useEffect(() => {
    if (token1) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + token1,
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
  }, [setAvatarImage, setProfileName, token1]
  )

  return (
    <AuthContext.Provider
      value={{
        token1,
        setToken,
        deleteToken,
        profileName,
        setProfileName,
        avatarImage,
        setAvatarImage,
        logout,
        setToken1,
        flag,
        setFlag
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
