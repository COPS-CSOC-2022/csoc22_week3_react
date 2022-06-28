import React, {useEffect, useState} from "react"
import { useAuth } from '../context/auth'
import axios from '../utils/axios'
import { API_URL } from '../utils/constants'
import { displayErrorToast, displayInfoToast, displaySuccessToast } from './ToastMessage';

export default function TodoListItem(props) {
  const [enteredTask, setEnteredTask] = useState(props.task)
  const {token} = useAuth()
  const taskValue = enteredTask.trim();


  const del = () => {
    deleteTask(props.id)
  }

  const ed = () => {
    editTask(props.id)
  }

  const up = () => {
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
    document.getElementById("task-action-"+id).classList.add("hideme");
  }
  const deleteTask = (id) => {
    axios({
        headers: {
          Authorization: 'Token ' + token
        },
        url:'todo/' + id + '/',
        method: 'DELETE',
    }).then(() => {
        displaySuccessToast("Task has been successfully deleted...");
        props.displayTasks();
    }).catch((err) => {
       displayErrorToast('Something went wrong')
    })
  }

   const updateTask = (id) => {
     

    if (taskValue === '') {
      displayErrorToast('Please enter a task')
    }
    else{
      axios({
        headers:{
          Authorization:'Token '+token
        },
        url:'todo/'+id+'/',
        method:'PUT',
        data:{title:enteredTask}
  
      })
      .then((res) => {
        setEnteredTask(res.data.title);
  
        displaySuccessToast('Task updated successfully')
  
      })
      .catch(() => {
  
       displayErrorToast('Something went wrong')
      })
  
    }
  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${props.id}`}
          type='text'
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          onChange={(event)=>setEnteredTask(event.target.value)}
          value={enteredTask}
        />
        <div id={`done-button-${props.id}`} className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={up}
          >
            Done
          </button>
        </div>
        <div id={`task-${props.id}`} className='todo-task  text-gray-600'>
          {enteredTask}
        </div>
        <span id={`task-action-${props.id}`}className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={ed}
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
            onClick={del}
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
