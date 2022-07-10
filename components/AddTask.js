import axios from "../utils/axios"
import { useState } from "react"
import { useAuth } from "../context/auth"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask({tasks, allTasks, setTasks, setAllTasks, query}) {
  const {token} = useAuth()
  const [_title, setTitle] = useState('')
  let adding = false
  const addTask = async () => {
    if (adding) return
    if (_title === '') {
      toast.error('Task title cannot be empty', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      return
    }
    adding = true
    toast.info('Adding task', {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    await axios({
      method: 'POST',
      url: 'todo/create/',
      headers: {Authorization: `Token ${token}`},
      data: {title: _title}
    }).catch( () => {
      toast.error('Something went wrong', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    })
    toast.success('Task added successfully!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTitle('')
    const newTask = await axios({
      method: 'GET',
      url: 'todo/',
      headers: {Authorization: `token ${token}`}
    }).then(res => res.data.pop())

    if (newTask.title.toLowerCase().indexOf(query) !== -1) setTasks([...tasks, newTask])
    setAllTasks([...allTasks, newTask])
    adding = false
  }

  return (
    <div className='flex items-center max-w-sm mt-10'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={_title}
        onChange={(e) => setTitle(e.target.value)}
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
