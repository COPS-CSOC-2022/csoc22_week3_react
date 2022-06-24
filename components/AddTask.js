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
    if(task.length===0) toast.warn("Write some task")
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
          theme==="dark"?
          toast.success("Task Added",{theme: "dark"}):
          toast.success("Task Added"),
          setTask('')
      ).catch((error)=>
      toast.notify("Task Not Added",{type: "error"})
      )
    })
  }
  }
  return (
    <div className=' flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input dark:bg-gray-800 dark:text-white px-4 py-2 dark:placeholder-white placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value = {task}
        onChange = {(e)=> {setTask(e.target.value)}}
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 dark:font-bold dark:bg-green-800 dark:text-white  text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
