import axios from "../utils/axios"
import { useState } from "react";
import { useAuth } from "../context/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function AddTask({tasks,setTasks}) {
  const [text,setText] = useState('');
  const {token} = useAuth();
  
  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    if(!text)
    { toast.info('Cannot add empty task', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      return;
    }

    const dataForApiReq = {
      title:text
    }
    toast.info('Task is being added...', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    axios
        .post('/todo/create/',
          dataForApiReq,{
          headers: {
            Authorization: 'Token '+localStorage.getItem('token'),
          },
      })
        .then(()=>{
          axios
          .get('/todo/',{
            headers: {
              Authorization: "Token " + localStorage.getItem('token')
            }
          })
          .then(function({data,status}){
            toast.success('Task Added Successfully', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            console.log(data);
            setTasks(data);
            setText('');
          })
          .catch(function(err){
            console.log(err);
          })
      })
        .catch(function(err){
          console.log(err)
      })
    
    }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 mr-3 bg-white rounded text-md border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value = {text}
        onChange = {(e)=> setText(e.target.value)}
      />
      <button
        type='button'
        className='font-bold todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-7 py-1 border border-green-500 hover:border-transparent rounded'
        onClick={() => addTask()}
      >
        Add Task
      </button>
    </div>
  )
}
