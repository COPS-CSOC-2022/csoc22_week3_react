import React, { useEffect, useState }from "react"
import axios from "axios"
import { useAuth } from '../context/auth'
import { fuchsia } from "tailwindcss/colors";

export default function AddTask(props) {
  const [ newTask, setNewTask ] = useState('');
  const {token} = useAuth();

  const addTask = () => {
    if(newTask === ''){
      console.log("Please enter task")
    }
    else{
      const dataForApiRequest = {
        newTask: newTask
      }
      const headersForApiRequest = {
        headers: { Authorization: 'Token '+token }
      }
      axios.post(
        "todo/create/", 
        dataForApiRequest, 
        headersForApiRequest
      )
      .then(res => {
        setNewTask("");
        props.displayTasks();
        console.log("Task Added");
      })
      .catch(function(err){
        console.log(err);
      })
    }
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e) => {
          setNewTask(e.target.value)
        }}
        value={newTask}
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
