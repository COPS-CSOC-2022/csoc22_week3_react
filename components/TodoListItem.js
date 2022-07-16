/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { useAuth } from "../context/auth"
import axios from "../utils/axios"
import { API_URL } from "../utils/constants"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

export default function TodoListItem({ title, id, getTasks }) {
  const { token } = useAuth()
  const [editStatus, setEditStatus] = useState(false)
  const [updateData,setupdateData] = useState('')
  const [input, setInput] = useState(title)
  
  useEffect(() => {
    console.log("input changed!")
  }, [input])

  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    
    setEditStatus(!editStatus)
  }

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
     if (token) {
      axios({
        method: "delete",
        url: API_URL + `todo/${id}/`,
        headers:{
          Authorization: 'Token ' + token
        }
      }).then((res)=>{
        toast.success('Task deleted succesfully')
        getTasks("getTask ran from deleteTask :)")
      }).catch((err)=>{
        toast.error('Failed to delete')
      })
    }
  }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */

     if (updateData == '') {
      toast.error('Please enter task title')
      return
    }
    const dataForUpdate = {
      title: updateData
    }
    if(token){
      axios.patch('todo/'+id+'/',dataForUpdate,{
        headers:{
          Authorization: 'Token ' + token
        }
      }).then((res)=>{
        setEditStatus(!editStatus)
        setupdateData('')
        toast.success('Update successfull!')
        getTasks("getTask ran from updateTask :)")
      }).catch((err)=>{
        toast.error('Update failed!')
      })
    }
  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={'input-button-'+id}
          type='text'
          className={`${(!editStatus) ? 'hideme' : ""} font-body appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder='Edit The Task'
          value={input} 
          onInput={(e) => {
            setInput(e.target.value)
          }}
          onChange={(e)=>setupdateData(e.target.value)}
        />
         <div id={'done-button-'+id} className={`${(!editStatus) ? 'hideme' : ""}`}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(id)}
          >
            Done
          </button>
        </div>
        <div id={'task-'+id} className='todo-task  text-gray-600'>
          {`${(!editStatus) ? title : ""}`}
        </div>
        <span id={'task-actions-'+id} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => {
              editTask(id)
            }}
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
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
            onClick={() => deleteTask(id)}
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
