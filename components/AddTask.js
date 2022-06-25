import axios from "axios";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { Alert } from "react-bootstrap";
import { ToastContainer, toast } from 
'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import 'react-toastify/dist/ReactToastify.css';
export default function AddTask(props) {
  const {token}=useAuth();
  const [task, setTask] = useState("");
  const addTask = () => {
    injectStyle();
    // const notify = () => toast.success("Wow so easy!");
     const taskVal = task.trim();
     if (taskVal.toString().length===0) {
         toast.error("Task can't be empty!")
         return;
     }

     axios({
         headers: {
             Authorization: "Token " + localStorage.getItem("token")
         },
         url: API_URL + "todo/create/",
         method: "post",
         data: { title: taskVal }
     })
         .then((res)=>{
             axios({
                 headers: {
                     Authorization: "Token " + localStorage.getItem("token")
                 },
                 url: API_URL + "todo/",
                 method: "get"
             }).then(({ data, status })=>{
                //  const newTask = data[data.length - 1];
                //  props.addNewTask(newTask);
                toast.success('New task added')
                console.log(task);
              console.log(typeof(data));
              const k=data.length-1;
              const addedTask = data[k];
              console.log(addedTask);
              props.addNewTask(addedTask);

             });
         })
         .catch((err)=>{
            console.error(err);
            toast.error('Error found!')
         });
         setTask("")

  }
  return (

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
      <ToastContainer
position="bottom-right"
autoClose={5000}
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
