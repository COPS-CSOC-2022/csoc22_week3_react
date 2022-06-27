import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import authCheck from '../middlewares/auth_required'
import { ToastContainer } from 'react-toastify'

export default function Home() {
  const { token_1 } = useAuth()
  const [tasks, setTasks] = useState([])
  authCheck();
  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
    getTasks();
    }
  },[token_1])
    function getTasks() {
      /***
       * @todo Fetch the tasks created by the user.
       * @todo Set the tasks state and display them in the using TodoListItem component
       * The user token can be accessed from the context using useAuth() from /context/auth.js
       */

      console.log(localStorage.getItem('token'))
      axios
      .get('/todo/',{
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
      .then(function({data,status}){
        setTasks(data);
      }).catch(function(err){
        console.log(err);
      })
    }
    

  return (
    <div>
      <center>
      <ToastContainer/>
        <AddTask tasks={tasks} setTasks={setTasks}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='available-task inline-block bg-blue-600 py-1 mb-4 px-9 text-xl text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <TodoListItem tasks = {tasks} setTasks= {setTasks}/>
        </ul>
      </center>
    </div>
  )
}
