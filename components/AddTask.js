import { useState } from 'react'
import { useAuth } from '../context/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../utils/axios'



export default function AddTask({getTasks}) {
  const [Task, setTask] = useState('')
  const {token} =useAuth()
  const registerFieldsAreValid = (Task ) => {
    if ( Task === ''    ) {
      toast.error('Title cannot be empty',{position: 'bottom-right'}) 
      return false
    }
    return true
  }
  const addTask = (e) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
      e.preventDefault()
      if (
        registerFieldsAreValid(Task)
      ) {
          const dataForApiRequest = {
          title: Task
        }
  
        axios.post(
          'todo/create/',dataForApiRequest,{
          headers: {
            Authorization: 'Token ' + token,
        },}
          
        )
        .then(function () {
            toast.success('Task created successfully',{position: 'bottom-right'})
            getTasks()
            setTask('')
        })
          .catch(function (err) {
            toast.error('Error!!',{position: 'bottom-right'})
          })
      }
    }
  
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e) => setTask(e.target.value)}
        value={Task}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
      <ToastContainer />
    </div>
  )
}
