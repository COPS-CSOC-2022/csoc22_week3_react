import { useState } from "react"
import axios from "../utils/axios";
import { useAuth } from "../context/auth"
import { position } from "tailwindcss/lib/plugins";

export default function AddTask() {
  const [newtodo,setNewTodo]=useState('');
  const {token} = useAuth();
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    const dataToPost={
      "title": newtodo
    }
    axios
    .post(
      'todo/create/',
      dataToPost,
      {
        headers:{
          Authorization: 'Token ' + token
        }
      })
      .then((res)=>{
      setNewTodo('');
      alert("Task added succesfully!!");
    }).catch((err)=>{
      // alert("Some error Occured!")
      console.log(err);
    })

  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={newtodo}
        onChange={(e)=>{setNewTodo(e.target.value)}}
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
