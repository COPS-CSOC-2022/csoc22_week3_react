import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { auth_required } from '../middlewares/auth_required'
import { useRouter } from 'next/router'
import { data } from 'autoprefixer'

export default function Home() {
  const route = useRouter()
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    auth_required(token, route)
    getTasks()
  },[])

  const index = (id, data) => data.findIndex(task => task.id === id)

  async function getTasks() {
    const {data} = await axios({
      method: 'GET',
      url: 'todo/',
      headers: {Authorization: `token ${token}`}
    })
    setTasks(data)
  }

  function onAddTask(id, title) {
    setTasks([...tasks, {title: title, id: id}])
  }


  return (
    <div>
      <center>
        <AddTask
          tasks={tasks}
          setTasks={setTasks}
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
              tasks={tasks}
              setTasks={setTasks}
            />
          )}
        </ul>
      </center>
    </div>
  )
}
