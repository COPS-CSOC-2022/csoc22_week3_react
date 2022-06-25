import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import React from 'react'
import { auth_required } from '../middlewares/auth_required'
import { no_auth_required } from '../middlewares/no_auth_required'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { tok , count } = useAuth()
  const [all, setAll] = useState([])
  
  async function getTasks() {
  /***
   * @todo Fetch the tasks created by the user.
   * @todo Set the tasks state and display them in the using TodoListItem component
   * The user token can be accessed from the context using useAuth() from /context/auth.js
   */
  if(tok){
       try {
        const data = await axios.get("https://todo-app-csoc.herokuapp.com/todo/"
        ,{
          headers:{
          Authorization: 'Token ' + tok,
          }
        }
        )
        setAll(data.data)
       } catch (error) {
        console.log(error);
       }
  }
}
   useEffect(() => {
    auth_required(tok)
    no_auth_required(tok)
    getTasks()
  },[count])
  return (
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 px-9 text-sm text-white font-bold rounded-full mb-10'>
            Available Tasks
          </span>
          <div className="todoTasks max-h-80">
            {
              Array.from(all).map((e)=>{
                return <TodoListItem key={e.id} title={e.title} id={e.id} />
              })
            }
          </div>
        </ul>
      </center>
      <ToastContainer />
    </div>
  )
}
