/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { useAuth } from "../context/auth"
import axios from "../utils/axios"
import {displayError, displayInfo, displaySuccess, displayWarning} from '../pages/_app'


export default function TodoListItem(props) {


  const { token } = useAuth();
  const refreshTask = () => props.getTasks();
  const [editingTask, setEditingTask] = useState(false);
  const display1 = { display: editingTask ? 'none' : 'flex' }
  const display2 = { display: !editingTask ? 'none' : 'flex' }
  const [updatedTask, setUpdatedTask] = useState('');


  const editTask = (id) => {
    setEditingTask(!editingTask);
  }

  const deleteTask = (id) => {

    axios({
      url: 'todo/' + id + '/',
      headers: {
        Authorization: 'Token ' + token,
      },
      method: 'delete',
    })
      .then(function ({ data, status }) {
        displayError("Task Deleted Successfully");
        refreshTask();
      })
      .catch((err) => {
        displayError("Some Error Occurred");
      })

  }

  const updateTask = (id) => {

    console.log(updatedTask);

    if (updatedTask === '') {
      displayWarning("😡😡 Task Cannot be Empty 😡😡")
      return;
    }

    const dataForApiRequest = {
      title: updatedTask,
    }

    axios(
      {
        url: 'todo/' + id + '/',
        headers: {
          Authorization: 'Token ' + token,
        },
        method: 'patch',
        data: dataForApiRequest

      })
      .then(function ({ data, status }) {
        refreshTask();
        displayWarning("Task Updated Successfully")
        setEditingTask(!editingTask);
      })
      .catch((err) => {
        displayError("Some Error Occurred");
      })
  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`'input-button-${props.id}'`}
          type='text'
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          style={display2}
        />
        <div id='done-button-1' style={display2}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id='task-1' className='todo-task  text-gray-600' style={display1}>
          {props.title}
        </div>
        <span id={`task-actions-${props.id}`} style={display1}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => editTask(props.id)}
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
            onClick={() => deleteTask(props.id)}
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
