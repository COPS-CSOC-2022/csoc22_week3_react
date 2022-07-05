import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { auth_required } from '../middlewares/auth_required'
import { useRouter } from 'next/router'
import { data } from 'autoprefixer'
import Search from '../components/Search'

export default function Home() {
  const route = useRouter()
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    auth_required(token, route)
    getTasks()
  },[])

  async function getTasks() {
    const {data} = await axios({
      method: 'GET',
      url: 'todo/',
      headers: {Authorization: `token ${token}`}
    })
    setTasks(Array.from(data))
    setAllTasks(Array.from(data))
  }

  return (
    <div>
      <center>
        <Search
          allTasks={allTasks}
          setTasks={setTasks}
          setQuery={setQuery}
        />
        <AddTask
          tasks={tasks}
          allTasks={allTasks}
          setTasks={setTasks}
          setAllTasks={setAllTasks}
          query={query}
          />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.map(({title, id}, index) =>
            <TodoListItem
              title={title}
              id={id}
              key={id}
              index={index}
              actualIndex={allTasks.findIndex((task) => task.id === id)}
              tasks={tasks}
              allTasks={allTasks}
              setTasks={setTasks}
              setAllTasks={setAllTasks}
            />
          )}
        </ul>
      </center>
    </div>
  )
}
