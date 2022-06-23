import TodoListItem from '../components/TodoListItem'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { API_URL }from '../utils/constants'
import { displayErrorToast, displaySuccessToast} from "../pages/index"

export default function AddTask(props) {
  const {token} = useAuth();
  const [task, setTask] = useState("")

  const addTask = () => {
    
    if (task==""){
      displayErrorToast("Task cannot be empty!!");
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
          setTask("");
          props.displayTasks();
          console.log(res);
          displaySuccessToast("Task added successfully");
      }).catch(function (err) {
          console.log(err);
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
