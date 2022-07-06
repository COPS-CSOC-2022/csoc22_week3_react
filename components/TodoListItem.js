/* eslint-disable @next/next/no-img-element */

import { useState } from "react"
import { useAuth } from "../context/auth"
import axios from "../utils/axios"

export default function TodoListItem({title, id, index, actualIndex, tasks, allTasks, setTasks, setAllTasks}) {
  const {token} = useAuth()
  const [editing, setEditing] = useState(false)
  const [_title, setTitle] = useState(title)

  const editTask = () => {
    setEditing(true)
  }

  const deleteTask = () => {
    axios({
      method: 'DELETE',
      url: `todo/${id}/`,
      headers: {Authorization: `token ${token}`}
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id))
      setAllTasks(allTasks.filter(task => task.id !== id))
    })
  }

  const updateTask = () => {
    axios({
      method: 'PUT',
      url: `todo/${id}/`,
      headers: {Authorization: `token ${token}`},
      data: {title: _title}
    })
    .then(() => {
      setTasks([...tasks.slice(0, index), {title: _title, id: id}, ...tasks.slice(index+1)])
      setAllTasks([...allTasks.slice(0, actualIndex), {title: _title, id: id}, ...allTasks.slice(actualIndex+1)])
      setEditing(false)
    })
  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id='input-button-1'
          type='text'
          className={`${editing ? '' :'hideme'} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder='Edit The Task'
          onChange={(e) => setTitle(e.target.value)}
          value={_title}
        />
        <div id='done-button-1' className={editing ? '': 'hideme'}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={updateTask}
          >
            Done
          </button>
        </div>
        <div id='task-1' className={`${editing ? 'hideme' : ''} todo-task  text-gray-600`}>
          {_title}
        </div>
        <span id='task-actions-1' className={editing ? 'hideme': ''}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={editTask}
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
            onClick={deleteTask}
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
