import axios from "axios"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { API_URL } from "../utils/constants"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function AddTask() {
  const [task, setTask] = useState("")
  const {token, theme} = useAuth()
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    if(task.length===0){
       toast.warn("Write some task")
    }
    else{
    axios({
      headers : {Authorization : "Token "+token},
      url : API_URL + 'todo/',
      method : 'get',
    
    }).then((res)=>{
      const {data,status}=res
      const apiData = {id : data.length, title : task}
      axios({
        headers : {Authorization : "Token "+token},
        url : API_URL + 'todo/create/',
        method: "post",
        data : apiData
      }).then(
          toast.success("Task added"),
          setTask('')
      ).catch((error)=>
      toast.notify("Task couldn't be added",{type: "error"})
      )
    })
  }
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-3 placeholder-blue-300 text-black bg-white rounded text-sm border border-blue-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter your task'
        value = {task}
        onChange = {(e)=> {setTask(e.target.value)}}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-blue-500 text-blue-700 text-sm hover:text-white px-3 py-3 border border-blue-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
