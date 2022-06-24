import React, { useState } from 'react'
import axios from '../utils/axios'
// const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";

export default function AddTask() {
  const [todoInput, setTodoInput] = useState('')
  const [todoCollection, setTodoCollection] = useState('')
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */

     const dataForApiRequest = {
      title: todoInput,
  }
    if (todoInput === '') {
      alert("Please enter a task");
    }
    else {
      const token = localStorage.getItem('token');
      axios({
        url: 'todo/create/',
        method: 'post',
        headers: {
          'Authorization': 'token ' + token
        },
        data: dataForApiRequest,
      }).then(function ({ data, status }) {
        // todoInput = '';
        console.log(123);
      }).catch(function (err) {
      alert('An error occured while adding the task');
        console.log(err)
      }
      )
    }
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
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
