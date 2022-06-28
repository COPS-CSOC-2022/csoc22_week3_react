/* eslint-disable @next/next/no-img-element */

import axios from "axios"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { API_URL } from "../utils/constants"

export default function TodoListItem(kicks) {
  const {token} = useAuth()
  const [edit,setEdit] = useState(false)
  const [editstring,setEditString] = useState(kicks.title)
  const editTask = () => {

    setEdit(true);
    
  }

  const deleteTask = (flag) => {
    axios({
      headers : {Authorization : "Token " + token},
      url : API_URL + 'todo/'+flag + '/',
      method : 'delete',
    })
  }

  const updateTask = (id) => {

    axios(
      {
        url: API_URL + 'todo/'+id + '/',
        headers: {Authorization: 'Token ' + token},
        method: 'patch',
        data : {title:editstring}

      })
      setEdit(false)
    
  }

  return (
    <>
      <li  className=' dark:bg-gray-800 border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${kicks.id}`}
          type='text'
          className={!edit ?'hideme' : 'appearance-none border rounded w-full py-2 px-3 text-gray-700  dark:text-white leading-tight focus:outline-none focus:ring  todo-edit-task-input'}
          placeholder='Edit The Task'
          value={editstring}
          onChange={(e)=>{setEditString(e.target.value)}}
        />
        <div id={`done-button-${kicks.id}`} className={!edit? 'hideme' : ''}>
          <button
            className='bg-transparent dark:bg-green-800 font-bold hover:bg-gray-500 text-gray-700 dark:text-white text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(kicks.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${kicks.id}`} className={!edit ? 'todo-task  dark:text-white' : 'hideme'}>
          {kicks.title}
        </div>
        <span id={`task-actions-${kicks.id}`} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask()}
            className={!edit ? ' dark:bg-green-800 hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2' : 'hideme'}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className={!edit ? 'dark:bg-red-500 dark:hover:bg-yellow-500 hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2': 'hideme'}
            onClick={()=>deleteTask(kicks.id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    </>
  )
}