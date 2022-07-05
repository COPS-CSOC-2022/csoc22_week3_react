import axios from "../utils/axios"
import { useState } from "react"
import { useAuth } from "../context/auth"

export default function AddTask({tasks, setTasks}) {
  const {token} = useAuth()
  const [_title, setTitle] = useState('')

  const addTask = async () => {
    await axios({
      method: 'POST',
      url: 'todo/create/',
      headers: {Authorization: `Token ${token}`},
      data: {title: _title}
    })
    
    const newTask = await axios({
      method: 'GET',
      url: 'todo/',
      headers: {Authorization: `token ${token}`}
    }).then(res => res.data.pop())

    setTasks([...tasks, newTask])
    setTitle('')
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
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
