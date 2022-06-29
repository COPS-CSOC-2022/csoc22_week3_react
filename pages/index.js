import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import authRequired from '../middlewares/auth_required'

export default function Home() {
  const { token, check } = useAuth()
  const [tasks, setTasks] = useState([])

  authRequired()
  
  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */

    if(token){
      axios.get('todo/',{
        headers:{
          Authorization: 'Token ' + token
        }
      }).then((res)=>{
          setTasks(res.data)
      }).catch((err)=>{
          console.log('Failed to fetch tasks')
      })
    }
  }

  useEffect(()=>{
      getTasks()
  },[check])

  return (
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='font-body inline-block bg-yellow-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.map((task)=>(
              <TodoListItem
                key={task.id} 
                title = {task.title}
                id = {task.id}
              />
          ))}
        </ul>
      </center>
    </div>
  )
}
