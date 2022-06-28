
import { useState } from "react";
import axios from '../utils/axios';
import { useAuth } from '../context/auth';
import {
  displaySuccessToast,
  displayInfoToast,
  displayErrorToast,
} from "../components/alert";
import Script from "next/dist/client/script";

export default function AddTask(props) {
  const[Task,setTask]=useState('');
  const { token }=useAuth();
  
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    if(Task==='')
    {
    
      displayInfoToast('Please enter te task')
      return;
    }

  
    const dataForAPIRequest={
      "title":Task,
    }

     axios.post('todo/create/',dataForAPIRequest,{
      headers:{
        Authorization:'Token '+token,
      }
    })
    .then((res) => {
      axios({
        headers:{
          Authorization:'Token '+token
        },
        url:'todo/',
        method:'get'
      })
      .then((res) => {
        const newTask=res.data[res.data.length-1];
        props.addNewTask(newTask);
      })

     
      displaySuccessToast('Task added successfully')

    })
    .catch(() => {
     
      displayErrorToast('Some error occured')
    });
    
    
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      
      
      <input
        id="input-field"
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-Gray-300 text-Gray-600 bg-white rounded text-sm border border-Gray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e) => {setTask(e.target.value);}}
      />
      <button
        type='button'
        className='todo-add-task'/* bg-transparent hover:bg-yellow-400 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'*/
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
