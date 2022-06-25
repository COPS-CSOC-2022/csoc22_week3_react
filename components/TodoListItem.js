

import axios from '../utils/axios';
import { useAuth } from "../context/auth";
import { useState } from 'react';
import { displayErrorToast, displayInfoToast, displaySuccessToast} from "../components/alert";

export default function TodoListItem(props) {
  const {title,id,deleteThisTask}=props;
  const {token}=useAuth();
  const [edit,setEdit]=useState(false);
  const [updatedTask,setTask]=useState('');
  const [task,setNewTask]=useState(title);
  
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
      headers:{
        Authorization:'Token '+token
      },
      url:'todo/'+id+'/',
      method:'DELETE',
    })
    .then((res) => {
      deleteThisTask(id);
     
      displaySuccessToast('Task deleted Successfully')
    })
    .catch(() => {
     
      displayErrorToast('Something went wrong')
    })


  }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    if(updatedTask==='')
    {
      displayInfoToast('This field cant be blank')
      return;
    }
    const dataForAPIRequest={
      title:updatedTask
    }
    axios({
      headers:{
        Authorization:'Token '+token
      },
      url:'todo/'+id+'/',
      method:'PUT',
      data:dataForAPIRequest

    })
    .then((res) => {
      setEdit(false);
      setNewTask(res.data.title);
   
      displaySuccessToast('Task updated successfully')

    })
    .catch(() => {
     
      
     displayErrorToast('Something went wrong')
    })

  }

  return (
    <>
    
        <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
          <input
            id={'input-button-'+id}
            type='text'
            className={`${edit?"":"hideme"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
            placeholder={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div id={'done-button-'+id} className={edit?"":"hideme"}>
            <button
              className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
              type='button'
              onClick={() => updateTask(id)}
            >
              Done
            </button>
          </div>
          <div id={'task-'+id} className={`${edit?"hideme":""} todo-task  text-gray-600`}>
            {task}
          </div>
          <span id={'task-actions-'+id} className={`${edit?"hideme":""}`}>
            <button
              style={{ marginRight: '5px' }}
              type='button'
              onClick={() => editTask(id)}
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