import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import React from 'react'
import { auth_required } from '../middlewares/auth_required'
import { no_auth_required } from '../middlewares/no_auth_required'

function Home() {
  const { token1 ,flag } = useAuth()
  const [tasks, setTasks] = useState([])

 async function getTasks() {
  if(token1){
       try {
        const data =await axios.get("https://todo-app-csoc.herokuapp.com/todo/"
        ,{
          headers:{
          Authorization: 'Token ' + token1,
          }
        }
        )
        console.log(data.data);
        setTasks(data.data)
        console.log(tasks);
       } catch (error) {
        console.log(error);
       }
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
  }
  console.log(tasks);
}
   useEffect(() => {
    auth_required(token1)
    no_auth_required(token1)
    getTasks()
  },[flag])
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
              Array.from(tasks).map((e)=>{
                return <TodoListItem key={e.id} title={e.title} id={e.id} />
              })
            }
          </div>
        </ul>
      </center>
    </div>
  )
}

export default Home