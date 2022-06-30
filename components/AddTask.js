import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import { API_URL } from '../utils/constants'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask() {

  const [task, setTask] = useState('')
  const { token } = useAuth()

  const addTask = () => {

    if(!task.length) {
      toast.error('Task cannot be empty!',{position: toast.POSITION.TOP_CENTER})
    }
    else {
      axios({
        headers: {
          Authorization: 'Token ' + token
        },
        url: API_URL + 'todo/create/',
        method: 'post',
        data: {title: task}
      }).then(function({data,status}){
        toast.success('Task added successfully!',{position: toast.POSITION.TOP_CENTER})
        setTask('')
      }).catch((error) => {
        toast.error('Please try again!',{position: toast.POSITION.TOP_CENTER})
      })
    }
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        id='addTask'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={task}
        onChange={(e)=> setTask(e.target.value)}
      />
      <button
        type='button'
        id='addTaskButton'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}>
        Add Task
      </button>
    </div>
  )
}
