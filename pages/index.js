import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'

export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])

  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
  }

  return (
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 px-9 text-sm text-white font-bold rounded-full mb-10'>
            Available Tasks
          </span>
          <div className="todoTasks max-h-80">
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          <TodoListItem />
          </div>
        </ul>
      </center>
    </div>
  )
}
