import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/auth";
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddTask() {
  /**
   * @todo Complete this function.
   * @todo 1. Send the request to add the task to the backend server.
   * @todo 2. Add the task in the dom.
   */
  const [newTask,setNewTask] = useState('')
  const {tok,count,incCount} = useAuth()
  const addTask = () => {
    axios.post(
      "https://todo-app-csoc.herokuapp.com/todo/create/",{
        title:newTask
      },{
        headers: {
          Authorization: 'Token ' + tok,
        },
      }
    ).then(()=>{
      incCount(count+1);
      setNewTask('');
      toast.success('Task added successfully',{
        position:'bottom-right'
    });
    }).catch((e)=>{
      console.log(e);
      toast.error("Couldn't add task",{position:'bottom-right'});
    })
  }
  return (
    <div className='flex flex-col items-center  max-w-sm mt-24' style={{
    width:"40vw"
    }}>
      <input
        type='text'
        value={newTask}
        className='todo-add-task-input px-8 py-4 placeholder-blueGray-300 text-gray-500 rounded-lg text-sm border border-blueGray-300 focus:ring w-full'
        placeholder='Enter Task'
        onChange={(e)=>{setNewTask(e.target.value);}}
      />
      <div className="w-full" onClick={addTask}>
      <button className='todo-add-task text-sm px-4 py-4 hover:border-transparent mt-9 cursor-pointer text-white rounded-lg w-full focus:outline-none'>
          Add Tasks
        </button>
      </div>
    </div>
  )
}
