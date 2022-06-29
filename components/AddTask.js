import axios from "../utils/axios"
import { useState } from "react"
import { useAuth } from "../context/auth"
import toast, { Toaster } from 'react-hot-toast';

export default function AddTask() {
  const [taskData,settaskData] = useState('')
  const { token, check, setCheck } = useAuth()

  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    if (token){
      if (taskData == ''){
        toast.error('Enter some data')
        return
      }
      const dataForApiPost = {
          title : taskData,
      }
      axios.post('todo/create/',dataForApiPost,{
        headers:{
          Authorization: 'Token '+ token
        }
      }).then((res)=>{
          settaskData('')
          setCheck(!check)
          toast.success('Task added successfully!')
      }).catch((err)=>{
          toast.error('Failed to add task')
      })
    }
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='font-body todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e)=> settaskData(e.target.value)}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-yellow-500 text-yellow-700 text-sm hover:text-white px-3 py-2 border border-yellow-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
      <Toaster/>
    </div>
  )
}
