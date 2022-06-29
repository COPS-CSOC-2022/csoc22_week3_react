import React, { useEffect, useState } from 'react'

import axios from '../utils/axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';
import {Home} from '../pages/index';
import { route } from 'next/dist/next-server/server/router';
import TodoListItem from './TodoListItem';



export default function AddTask(props) {
  const [title, setTitle] = useState('')
  const {token}=useAuth()
  
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
     const dataForApiRequest = {
      
      title: title
    }
//      axios.post(
//       'todo/create/',
//       dataForApiRequest,
//       {
//         headers: {
//           Authorization: "Token " + token
//         }
//       }
      
//     )
//     .then((data,status)=>{
// toast.success("Added Task")
//     })
//     .catch(function (err) {
//       console.log(err,
//         'Error in adding task'
//       )
      
//       toast.error("Error in adding task")
     
      
//     })
if(title.length==0){toast.error("Please enter a valid task!")}
else
axios({
  headers: {
      Authorization: "Token " + token
    },
   url: 'https://todo-app-csoc.herokuapp.com/' + 'todo/create/',
   method: 'post',
   data: dataForApiRequest,
}).then(function(res) {
 toast.success("Added Task!")
  
props.refget()
 
 setTitle('')
 
 
 
  
 
}).catch(function(err) { console.log(err);
 toast.error('Something went wrong!');
})

}   

  
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Enter Task'
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
        style={{ backgroundColor: 'black' }}
      >
        <h1 className='neonText'>Add Task</h1>
      </button>
      
      <ToastContainer
      position="bottom-right"
      theme="light"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
       />
       
    </div>
  )
}
