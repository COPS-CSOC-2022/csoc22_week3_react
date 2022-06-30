import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import {success , error , warn } from "../pages/_app"

/* eslint-disable @next/next/no-img-element */
export default function TodoListItem(props) {

  const { token } = useAuth()
  const [task, setTask] = useState('')
 
  const [edit , setEdit] = useState(false);
  
  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    setEdit(true);
  }
  
  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */

     axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_URL+'todo/'+id+'/',
      method: "delete",
    })
      .then(function (status) {
        success('Task deleted .');
        props.getTasks();
      })
      .catch(function (err) {
        error("Your Request couldn't be completed .");
      });
     
  }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */

    if(task== "")
    {
       warn('Task name cannot be empty .')
       return;
    }
     const dataForApiRequest = {
      title:task
    }
     axios({
      headers: {
        Authorization: "Token " + token,
      },
      url: API_URL+'todo/'+id+'/',
      method: "patch",
      data:dataForApiRequest
    })
      .then(function (status) {
        success('Task updated .')
        setEdit(false);
        props.getTasks();
      })
      .catch(function (err) {
        error("Your Request couldn't be completed .");
      });
  } 
  return (
    <>
      <li className='login-container border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${props.task.id}`}
          type='text'
          className={!edit ? 'hideme' : ' appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'}
          onChange={(e) => setTask(e.target.value)}
          placeholder= 'Edit the task '
          value= {task}
          
        />
        <div id={`done-button-${props.task.id}`} className={edit ? '' : 'hideme'}  >
          <button
            className='done-btn bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>{updateTask(props.task.id)}}
          >
            Done
          </button>
        </div>
        <div id={`task-${props.task.id}`} className={edit ? 'hideme' : 'todo-task'} >
         {props.task.title}
        </div>
        <span id={`task-actions-${props.task.id}`} >
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>{editTask(props.task.id)}}
            className={edit ? 'hideme' : 'bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2 edit'}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className={edit ? 'hideme' : 'bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2 delete'}
            onClick={()=>{deleteTask(props.task.id)}}
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

