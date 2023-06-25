/* eslint-disable @next/next/no-img-element */
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'



export default function TodoListItem(selection, aim) {
  if (aim == 'edit')
    editTask(selection);
  if (aim == 'delete')
    deleteTask(selection);

  // const [todoInput, setTodoInput] = useState('')
  let todoInput = '';
  const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";


  function editTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    document.getElementById('task-' + id).classList.add('hideme');
    document.getElementById('task-actions-' + id).classList.add('hideme');
    document.getElementById('input-button-' + id).classList.remove('hideme');
    document.getElementById('done-button-' + id).classList.remove('hideme');

  }
  // const { token } = useAuth()

  function deleteTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */

    axios({
      url: 'todo/' + id + '/',
      method: 'delete',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      },
    }).then(function ({ data, status }) {
      const task = document.getElementById(id);
      task.remove();
      // console.log('del');
      // getTasks()
      console.log(data);

    }).catch(function (err) {
      alert('An error occured while deleting the task');

    }
    )

  }
  if (aim == 'update')
    updateTask(selection);
  function updateTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    const input = document.getElementById('input-button-' + id);
    const todoInput = input.value;

    //  console.log(id);
    const dataForApiRequest = {
      title: todoInput,
    }
    // console.log(todoInput);
    axios({
      url: API_BASE_URL + 'todo/' + id + '/',
      method: 'put',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
      data: dataForApiRequest,
    }).then(function ({ data, status }) {
      // getTasks()
      const input = document.getElementById('input-button-' + id);
      const done_div = document.getElementById('done-button-' + id);
      const task_title = document.getElementById('task-' + id);
      const task_action = document.getElementById('task-actions-' + id);
      input.value = '';
      input.classList.add('hideme');
      done_div.classList.add('hideme');
      task_title.classList.remove('hideme');
      task_action.classList.remove('hideme');
      task_title.innerHTML = todoInput;
      // console.log(234);

    }).catch(function (err) {
      alert('An error occured while updating the task');
    }

    )


  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        {/* <input
          id='input-button-1'
          type='text'
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
        />
        <div id='done-button-1' className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={updateTask(1)}
          >
            Done
          </button>
        </div>
        <div id='task-1' className='todo-task  text-gray-600'>
          Sample Task 1
        </div>
        <span id='task-actions-1' className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={editTask(1)}
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
            onClick={deleteTask(1)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span> */}
      </li>
    </>
  )
}
