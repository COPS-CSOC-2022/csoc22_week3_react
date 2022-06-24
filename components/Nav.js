/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useEffect } from 'react'
import { useAuth } from '../context/auth'
import { useState } from 'react'


/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */
export default function Nav() {
  const { logout, profileName, avatarImage, token, theme, setTheme } = useAuth()
  const [mounted,setMounted] = useState(true)
  
  useEffect(()=>{(token)?setMounted(true):setMounted(false)},[])
  useEffect(()=>{(token)?setMounted(true):setMounted(false)},[token])

  return (
    <nav className='bg-blue-600 dark:bg-green-800'>
    
      <ul className='flex items-center justify-between p-5'>
        <ul className='flex items-center justify-between space-x-4'>
          <li>
            <Link href="/" passHref={true}>
              <a>
                <h1 className='text-white font-bold text-xl'>Todo</h1>
              </a>
            </Link>
            <button className='inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight dark:bg-red-500 uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            onClick={() => {setTheme(theme === 'dark' ? 'light' : 'dark')}} >Change Theme </button>
          </li>
          </ul>
         { !mounted &&
            <div>
              <ul className='flex'>
                <li className='text-white mr-2'>
                  <Link href='/login'>Login</Link>
                </li>
                <li className='text-white'>
                  <Link href='/register'>Register</Link>
                </li>
              </ul>
           </div>
        }
          <div className='inline-block relative w-28'>
            <div className='group inline-block relative'>
        { mounted && ( <>
              <button className='bg-gray-300 dark:bg-red-500 dark:text-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
                <img src={avatarImage} />
                <span className='mr-1'>{profileName}</span>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </button>
              <ul className='absolute hidden text-gray-700 pt-1 group-hover:block'>
                <li className=''>
                  <a
                    className='rounded-b dark:bg-red-500 dark:text-white  bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'
                    href='#'
                    onClick={logout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
              </>
             )}
            </div>
          </div>
        
      
      </ul>
    </nav>
  )
}

