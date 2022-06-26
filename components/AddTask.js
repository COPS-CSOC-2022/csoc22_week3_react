import { useState } from "react"
import axios from '../utils/axios'
import { useAuth } from "../context/auth";

import {displaySuccess, displayWarning, displayError, displayInfo} from '../pages/_app'


export default function AddTask(props) {

  const [task, setTask] = useState('');
  const { token } = useAuth();


  const refreshTask = () => props.getTasks();


  const addTask = () => {

    if (task === '') {
      displayWarning("Task Cannot be Empty")
      return
    }

    const dataForApiRequest = {
      title: task,
    }

    axios({
      url: 'todo/create/',
      headers: {
        Authorization: 'Token ' + token,
      },
      method: 'post',
      data: dataForApiRequest,
    })
      .then(function ({ data, status }) {
        setTask("")
        refreshTask();
        displaySuccess("Task Added Successfully")
      })
      .catch(function (err) {
        displayError("Some Error Occurred")
      })
  }
  return (
    <>
      <div className='flex items-center max-w-sm mt-24'>
        <input
          type='text'
          className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
          placeholder='Enter Task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type='button'
          className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
    </>
  )
}
