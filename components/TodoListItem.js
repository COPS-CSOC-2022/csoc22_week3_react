/* eslint-disable @next/next/no-img-element */
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { API_URL } from "../utils/constants"
import { useAuth } from '../context/auth'
export default function TodoListItem(props) {
const {auth}=useAuth()
const {token}=useAuth()
  const [task, setTask] = useState(props.task);
  const [edit, setEdit] = useState(false);
  // const [updateDesc, setupdateDesc] = useState(props.todo.title);
  const  editTask = (id) => {
     setEdit(true);
  }
  const deleteTask = (id) => {
     axios({
      headers: {
          Authorization: "Token " + 
          localStorage.getItem('token')
      },
      url: API_URL + "todo/" + id + "/",
      method: "delete"
  })
      .then(({ data, status })=>{
        props.deleteTask(id);
       toast.success('Task deleted')
      })
      .catch((err)=>{
          console.error(err)
          toast.error('Error found!')
      });
  }
  const updateTask = (id) => {
    // const notify = () => toast.success("Wow so easy!");
    const taskVal = task.trim();
    if (taskVal.toString().length===0) {
        toast.info("You can't leave the task empty");
        return;
    }
    else{
    axios({
        headers: {
            Authorization: "Token " + localStorage.getItem("token")
        },
        url: API_URL + "todo/" + id + "/",
        method: "patch",
        data: { title: taskVal }
    })
        .then(({ data, status })=>{
            setEdit(false);
            toast.success('Task updated')
            
        })
        .catch((err)=>{
            console.error(err);
            toast.error('Error found!')
        });
      }
  }
  return (
    <div >
    <>
      <li className='border flex border-gray-500 rounded px-3 py-3 justify-between items-center mb-2 bg-transparent hover:bg-green-200'>
        <input
          id={`input-button-${props.id}`}
          type='text'
          className={`${edit?'':'hideme'} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder='Edit The Task'

          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div id={`done-button-${props.id}`} className={`${edit?'':'hideme'}`}>
          <button
            className='bg-transparent hover:bg-yellow-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${props.id}`} className={`todo-task ${edit?'hideme':''}   text-gray-600`}>
          {task}
        </div>
        <span id={`task-actions-${props.id}` }className={`${edit?'hideme':''}`}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(props.id)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
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
            onClick={()=>deleteTask(props.id)}
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
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
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </>
</div>
  )
}
