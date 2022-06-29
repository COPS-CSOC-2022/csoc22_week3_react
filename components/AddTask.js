import TodoListItem from '../components/TodoListItem'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { API_URL }from '../utils/constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function displaySuccessToast(message) {
  toast.success(message);
}
export function displayWarnToast(message) {
  toast.warn(message);
}

export function displayErrorToast(message) {
  toast.error(message);
}
export default function AddTask() {
  const {token} = useAuth();
  const [task, setTask] = useState("")
  const addTask = () => {
    if (task==""){
      displayWarnToast("Task is empty!!");
    }
    else{
      axios({
          headers: {
            Authorization: 'Token ' + token
          },
          url: API_URL + "todo/create/",
          method: 'POST',
          data: {
            title: task
          },
      }).then(res => {
          displaySuccessToast("Task added!!!");
          setTask("");
          props.displayTasks();
          
      }).catch(function (err) {
      })
    }
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        onChange={(e)=>setTask(e.target.value)}
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={task}
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
