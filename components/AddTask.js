import axios from "axios"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { API_URL } from "../utils/constants"

export default function addTask() {
  const [Task,settheTask]=useState("")
  const {token}=useAuth()
  const addTask = () => {
    
    if(Task.length===0)
    {
      alert('Please Write some Task!')
    }
    else
    {
      axios({
        headers : {Authorization : "Token "+token},
        url : API_URL + 'todo/',
        method : 'get',
      
      }).then((res)=>{
        const {data}=res
        const apiData = {id : data.length, title : Task}
        axios({
          headers : {Authorization : "Token "+token},
          url : API_URL + 'todo/create/',
          method: "post",
          data : apiData
        })
        })
    }
    }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={Task}
        onChange={(e)=>{settheTask(e.target.value)}}
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