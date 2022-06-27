/* eslint-disable @next/next/no-img-element */

import axios from "axios"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { API_URL } from "../utils/constants"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function TodoListItem(props) {
  const {token} = useAuth()
  const [edit,setEdit] = useState(false)
  const [editString,setEditString] = useState(props.title)
  const editTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    setEdit(true)

  }

  const deleteTask = (key) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    console.log("triggered-delete" + key)
    axios({
      headers : {Authorization : "Token " + token},
      url : API_URL + 'todo/' + key + '/',
      method : 'delete',
    }).then((res)=> toast.success("Task Deleted"))
    .catch((err)=> toast.success("Task Not Deleted"))
  }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    axios({
      headers : {Authorization : 'Token' + token},
      url : API_URL + 'todo/' + id + '/',
      method : 'patch',
      data : {title : editString}
    }).then((res)=>{
      setEdit(false);
    toast.success("Task Updated")})
    .catch((err)=> {toast.success("Task Not Updated")
  })
  }
  

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${props.id}`}
          type='text'
          className={!edit ?'hideme' : 'appearance-none border rounded w-full py-2 px-3 text-gray-700  dark:text-white leading-tight focus:outline-none focus:ring  todo-edit-task-input'}
          placeholder='Edit The Task'
          value={editString}
          onChange={(e)=>{setEditString(e.target.value)}}
        />
        <div id={`done-button-${props.id}`} className={!edit? 'hideme' : ''}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            
            onClick={()=>updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${props.id}`} className={!edit ? 'todo-task  dark:text-white' : 'hideme'}>
          {props.title}
        </div>
        <span id={`task-actions-${props.id}`} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(props.id)}
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
            onClick={()=>deleteTask(props.id)}
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
