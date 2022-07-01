import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { API_URL } from '../utils/constants'
import { success , error ,warn } from '../pages/_app'


export default function AddTask(props) {

  const {token} = useAuth()
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    
      if(title=="")
      {
        warn('Task name cannot be empty .' )
        return ;
      }

      const dataForApiRequest = {
              title:title
      }
      axios({
        headers: {
            Authorization: "Token " + token,
        },
        url: API_URL+'todo/create/',
        method: 'post',
        data: dataForApiRequest,
          })
             .then(function ({ data, status }) {
              success('Task added  .');
              setTitle('');
              props.getTasks();
              })
             .catch(function (err) {
              error('Your request cannot be completed .')
            })
  }
  return (
    <div className='flex items-center max-w-sm mt-24' id='addtask'>
      <input
        type='text'
        className='login-container todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Enter Task'
      />
      <button
        type='button'
        id='input-btn'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
