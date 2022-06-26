import React, { useState} from 'react'
import axios from '../utils/axios'
import { useAuth } from "../context/auth"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask() {
  const [task, setTask] = useState("")
  const {token} = useAuth()
  
  const addTask = () => {
    
    if(task==="") {
      toast.warn("Don't leave task empty......")
      return;
    }
    
     toast.info('Please wait...',{position: "top-center",autoClose: 1000})

      const dataForApiRequest = {
        title: task
      }

      const headersForApiRequest = {
      headers: {Authorization: 'Token ' + token,}
      }
  

      axios.post(
        '/todo/create/',dataForApiRequest,headersForApiRequest,
      )
        .then(function ({ data, status }) {
          setTask("");
          toast.success("Your Task has been added in the Todo Succesfully....",{position: "top-center"})
        })
        .catch(function (err) {
          toast.error("Unable to add Task. Please try again ....",{position: "top-center"})
        })
    }
  return (
    <div className='flex items-center max-w-sm mt-24'>
    <ToastContainer />
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        name='task'
        id='task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )  
    
  }
  

