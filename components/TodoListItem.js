/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from '../context/auth'
import { API_URL } from '../utils/constants'

export default function TodoListItem(props) {
  const [ newTask, setNewTask ] = useState(props.task)
  const {token} = useAuth()

  const edited = () => {
    editTask(props.id)
  }

  const deleted = () => {
    deleteTask(props.id)
  }

  const updated = () => {
    updateTask(props.id);
    document.getElementById("input-button-"+props.id).classList.add("hideme");
    document.getElementById("done-button-"+props.id).classList.add("hideme");
    document.getElementById("task-"+props.id).classList.remove("hideme");
    document.getElementById("task-action-"+props.id).classList.remove("hideme");
  }

  const editTask = (id) => {
    document.getElementById("input-button-"+id).classList.remove("hideme");
    document.getElementById("done-button-"+id).classList.remove("hideme");
    document.getElementById("task-"+id).classList.add("hideme");
    document.getElementById("task-actions-"+id).classList.add("hideme");
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
  }

  const deleteTask = (id) => {
    const headersForApiRequest = {
      headers: {Authorization: 'Token '+token}
  }
  axios.delete(
    'todo/' + id + '/',
    headersForApiRequest
  ).then(function ({ data, status }) {
        console.log("Deleted Task");
        props.displayTasks();
    }).catch(function (err) {
      console.log("Error")
      }) 

  }
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
  

  const updateTask = (id) => {
    if(newTask === ''){
      console.log("Enter Task")
    }
    else{
      const dataForApiRequest = {
        newTask: newTask
      }
      const headersForApiRequest = {
        headers: { Authorization: 'Token'+token}
      }
      axios.patch(
        'todo/'+id+'/',
        dataForApiRequest,
        headersForApiRequest
      ).then(function({ data, status }){
        document.getElementById("input-button-"+id).classList.add("hideme");
        document.getElementById("done-button-"+id).classList.add("hideme");
        document.getElementById("task-"+id).classList.remove("hideme");
        document.getElementById("task-actions-"+id).classList.remove("hideme");
        console.log("Task Updated");
      }).catch(function(err){
        console.log("Error")
      })
    }
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={'input-button-${props.id}'}
          type='text'
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <div id={'done-button-${props.id}'} className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={updated}
          >
            Done
          </button>
        </div>
        <div id={'task-${props.id}'} className='todo-task  text-gray-600'>
          {newTask}
        </div>
        <span id={'task-actions-${props.id}'} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={edited}
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
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={deleted}
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
