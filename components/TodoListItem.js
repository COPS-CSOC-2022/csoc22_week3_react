import React, {useState} from "react"
import { useAuth } from '../context/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../utils/axios'
import { API_URL } from '../utils/constants'

export default function TodoListItem(props) {
  const [task, setTask] = useState(props.task)
  const {token} = useAuth()

  const inputId = "input-button-"+props.id;
  const doneId = "done-button-"+props.id;
  const taskId = "task-"+props.id;
  const taskActionsId = "task-actions-"+props.id;

  const editTask = (id) => {
    document.getElementById("input-button-"+id).classList.remove("hideme");
    document.getElementById("done-button-"+id).classList.remove("hideme");
    document.getElementById("task-"+id).classList.add("hideme");
    document.getElementById("task-actions-"+id).classList.add("hideme");
  }

  const deleteTask = (id) => {
    axios({
        headers: {
          Authorization: 'Token ' + token
        },
        url: API_URL + 'todo/' + id + '/',
        method: 'DELETE',
    }).then(() => {
        toast.success("Task has been deleted",{position: "top-center"});
        props.displayTasks();
    }).catch((err) => {
        toast.warn("error",{position: "top-center"});
    })
  }

  const updateTask = (id) => {
    if (task===""){
      toast.warn("Task is empty!!",{position: "top-center"});
    }
    else{
      axios({
          headers: {
            Authorization: 'Token ' + token
          },
          url: API_URL + 'todo/' + id + '/',
          method: 'PUT',
          data: {
            title: task
          },
      }).then(() => {
          toast.success("Todo has been updated...",{position: "top-center"});
          document.getElementById("input-button-"+props.id).classList.add("hideme");
          document.getElementById("done-button-"+props.id).classList.add("hideme");
          document.getElementById("task-"+props.id).classList.remove("hideme");
          document.getElementById("task-actions-"+props.id).classList.remove("hideme");
          props.displayTasks();
      }).catch(function (err) {
          toast.warn("error",{position: "top-center"});
      })
    }
  }

  return (
    <>
    <ToastContainer/>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          onChange={(e)=>setTask(e.target.value)}
          id={inputId}
          type='text'
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          value={task}
        />
        <div id={doneId} className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id={taskId} className='todo-task  text-gray-600'>
          {task}
        </div>
        <span id={taskActionsId} className=''>
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
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={()=>deleteTask(props.id)}
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
