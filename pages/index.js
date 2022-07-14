import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import {Auth} from '../middlewares/auth_required'
export default function Home() {
  const router=useRouter()
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [Search,setSearch] = useState('')
  useEffect(() => {
    if(Auth(token))
    {router.push('/login');return;}
    getTasks()
  }, [Search]) 
  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */

     axios
     .get('todo/', {
       headers: {
         Authorization: 'Token ' + token,
       },
     })
     .then((response) => {
      const todos=[]
        let data=response.data;
        data.forEach(todo => {
          if((todo.title).search(Search) != -1)
          todos.push(todo);
        })
        setTasks(todos);
      })
      .catch((error) => {
       console.log('Some error occurred')
      })
  }

  return (
    <div>
      <center>
      <AddTask getTasks={getTasks}/>
          <input
          type='text'
          className='todo-add-task-input mt-4 px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
          placeholder='Search for tasks'
          onChange={(e) => {setSearch(e.target.value);}}
          value={Search}
          />
          <button
            type='button'
            className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
            onClick={()=>setSearch('')}
          >
            Clear
          </button>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <TodoListItem todo={tasks} getTasks={getTasks}/>
        </ul>
      </center>
    </div>
  )
}
