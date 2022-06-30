/* eslint-disable @next/next/no-img-element */

import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import { API_URL } from '../utils/constants'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoListItem(props) {

  const { token } = useAuth()
  const [edit, setEdit] = useState(false)
  const [editText, setEditText] = useState('props.title')

  const editTask = () => {
    setEditText('')
    setEdit(true)
  }

  const deleteTask = (id) => {

    axios({
      headers: {Authorization: 'Token ' + token},
      url: API_URL + 'todo/' + id + '/',
      method: 'delete'
    }).then(function({data,status}){
      toast.success('Task deleted successfully!',{position: toast.POSITION.TOP_CENTER})
    }).catch((error)=>{
      toast.error('Please try again!',{position: toast.POSITION.TOP_CENTER})
    })
  }

  const updateTask = (id) => {
    
    axios({
      headers: {Authorization: 'Token ' + token},
      url: API_URL + 'todo/' + id + '/',
      method: 'patch',
      data: {id: id, title: editText},
    }).then(function({data,status}){
      toast.success('Task updated successfully!',{position: toast.POSITION.TOP_CENTER})
    }).catch((error)=>{
      toast.error('Please try again!',{position: toast.POSITION.TOP_CENTER})
    })
    setEdit(false)
  }

  return (
    <>
      <li id='tasks' className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id='input-button-${props.id}'
          type='text'
          className={!edit?'hideme':'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'}
          placeholder='Edit the task'
          value = {editText}
          onChange={(e)=>{setEditText(e.target.value)}}
        />
        <div id='done-button-${props.id}' className={!edit?'hideme':''}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id='task-${props.id}' className={!edit?'todo-task  text-gray-600':'hideme'}>
          {props.title}
        </div>
        <span id='task-actions-${props.id}' className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask()}
            className={!edit?'bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2':'hideme'}
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
            className={!edit?'bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2':'hideme'}
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
