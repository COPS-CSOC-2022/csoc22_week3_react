/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useAuth } from '../context/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../utils/axios'

export default function TodoListItem({todo,getTasks}) {
  const {token}=useAuth()
  const [hideid,sethideid]=useState('')
  const [updatetask,setupdatetask] = useState('')
  const registerFieldsAreValid = (Task ) => {
    if ( Task === ''    ) {
      toast.error('Title cannot be empty',{position: 'bottom-right'}) 
      return false
    }
    return true
  }
  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    sethideid(id)
    setupdatetask('')
  }

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
     axios
      .delete(`todo/${id}/`, {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
      .then(()=>{toast.success("Task deleted successfully",{position: 'bottom-right'});
        getTasks()
      })
        .catch(err => console.error(err));
    }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */     
    if (registerFieldsAreValid(updatetask)) {
      console.log('Please wait...')
 
      const dataForApiRequest = {
         title: updatetask,
      }
      axios
      .put(
          `todo/${id}/`,dataForApiRequest,{
          headers: {
           'Authorization': 'Token ' + token,
           'Content-Type': "application/json",
        },
      })
      .then((response)=>  {toast.success("Task Edited successfully!",{position: 'bottom-right'});sethideid('');getTasks()})
      .catch(err => console.error(err))  
    }
  }
  return (
    <>
    { 
      todo.map((task)=>
      (<li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2' key={task.id}>
        <input
          id={`input-button-${task.id}`}
          type='text'
          className=  {`${hideid!=task.id ? 'hideme' : ''} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder='Edit The Task'
          value={updatetask}
          onChange={(e)=>setupdatetask(e.target.value)}
        />
        <div id={`done-button-${task.id}`} className={hideid!=task.id ? 'hideme' : ''}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(task.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${task.id}`} className={`${hideid==task.id ? 'hideme' : ''} hidemetodo-task  text-gray-600`}>
          {task.title}
        </div>
        <span id={`task-actions-${task.id}`} className={hideid==task.id ? 'hideme' : ''}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(task.id)}
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
            onClick={()=>deleteTask(task.id)}
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
      ))
    }
    <ToastContainer />
    </>
  )
}

