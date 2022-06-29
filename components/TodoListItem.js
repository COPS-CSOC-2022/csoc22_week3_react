/* eslint-disable @next/next/no-img-element */

import axios from "../utils/axios"
import { useState } from "react"
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
export default function TodoListItem({tasks, setTasks}) {
  const {token} = useAuth();
  const[inputText,setInputText] = useState('');
  const[editId,setEditId]= useState('');

  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    setEditId(id);
    console.log("Edit task clicked")
  }

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    axios
    .delete(`/todo/${id}`, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      },
    }).then(function({data,status}){
      toast.success('Task Deleted', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      console.log(data);
    }).catch(function(err){
      console.log(err);
      toast.error('Unable to delete the task', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    const dataForApiRequest = {
      title: inputText
    }
    if(inputText==='')
    {
      toast.info('Task cannot be empty', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    axios.
      patch(`/todo/${id}/`,dataForApiRequest,{
        headers: {
          Authorization: "Token " + localStorage.getItem('token')
        }
      }).then(()=>{
        axios
        .get('/todo/',{
          headers: {
            Authorization: "Token " + localStorage.getItem('token')
          }
        })
          .then(function({data,status}){
            toast.success('Task Updated Successfully', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            console.log("Update Successfull")
            console.log(data);
            setTasks(data);
            setEditId('');
          })
        })
        .catch(function(err){
          toast.error('Unable to Update the task', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          console.log(err);
        })
    setInputText('');
  }

  return (
    <>
     {tasks.map((task)=>(
      <li key={task.id} className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        {(editId === task.id) &&
        <input
          id={'input-button-' + task.id}
          type='text'
          className= 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          value={inputText}
          onChange ={(e)=> setInputText(e.target.value)}
        />
        }
        {(editId === task.id) &&
          <div id={'done-button-'+task.id} >
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(task.id)}
          >
            Done
          </button>
        </div>
        }
        {(editId !== task.id) &&
        <div id={'task-'+tasks.id} className='todo-task  text-gray-600 '>
         {task.title}
        </div>
        }
        {(editId !== task.id) &&
        <span id={'task-actions-'+task.id} >
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => editTask(task.id)}
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
            onClick={() => deleteTask(task.id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
        }
      </li>
     ))} 
    </>
  )
}
