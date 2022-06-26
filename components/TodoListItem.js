import axios from "axios"
import React from "react"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable @next/next/no-img-element */

export default function TodoListItem(props) {
  /**
   * @todo Complete this function.
   * @todo 1. Update the dom accordingly
   */
  const [toEdit, setToEdit] = useState(false)
  const [updatedTask,setUpdatedTask] = useState('')
  const {tok,count,incCount} = useAuth()
  const editTask = (id) => {
    {toEdit ? setToEdit(false) : setToEdit(true) }
  }

  const deleteTask = (id) => {
    console.log(id);
    axios.delete(`https://todo-app-csoc.herokuapp.com/todo/${id}/`,
    {
      headers:{
        Authorization:"Token " + tok
      }
    },
    )
    .then(()=>{
      incCount(count+1)
    toast.success('Task deleted successfully',{position:'bottom-right'});
  }).catch((err)=>{
      toast.error("Couldn't delete task",{position:'bottom-right'});
      console.log(err);
    })
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
  }

  const updateTask = (id) => {

    
    axios.patch(`https://todo-app-csoc.herokuapp.com/todo/${id}/`,
    {
      title:updatedTask
    },
    {
      headers:{
        Authorization:"Token " + tok
      }
    },
    )
    .then(()=>{
      {toEdit ? setToEdit(false) : setToEdit(true) }
      incCount(count+1)
      toast.success('Task updated successfully',{position:'bottom-right'});
    })
    .catch((err)=>{
      console.log(err);
      toast.error("Couldn't update task",{position:'bottom-right'})
    })
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  }
  return (
    <>
      <li className='todo-row border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={'input-button-'+props.id}
          type='text'
          className={`${toEdit ? '' :'hideme'} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder='Edit The Task'
          onChange={(e) =>{setUpdatedTask(e.target.value);}}
        />
        <div id={'done-button-'+props.id} className={`${toEdit ? '' :'hideme'}`}>
          <button
            className='bg-transparent hover:bg-blue-50 text-gray-700 text-sm  hover:text-green-600 py-2 px-3 border border-gray-500 hover:border-black rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id={'task-'+ props.id} className={`todo-task ${toEdit ? 'hideme':''}`}>
          {props.title} 
        </div>
        <span id={'task-actions-'+props.id} className={`${toEdit ? 'hideme':''}`}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(props.id)}
            className='bg-transparent hover:bg-white hover:text-green-600 border border-yellow-500 hover:border-black rounded px-2 py-2'
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
     <button className="bg-transparent hover:bg-white hover:text-white border border-red-500 hover:border-black rounded px-2 py-2"
     onClick={()=>{deleteTask(props.id)}}
     >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
     </button>
            
          
        </span>
      </li>
    </>
  )
}
