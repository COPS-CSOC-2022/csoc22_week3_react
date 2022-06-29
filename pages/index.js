import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'


export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  
  const newElement = tasks.map(task => {return <TodoListItem key={task.id} id={task.id} task={task.title} displayTasks={getTasks} />})


  useEffect(() => {
   getTasks()
  })


  function getTasks() {
     
     axios.get('todo/',{
      headers: {
        Authorization: 'Token ' + token
      }
  })
  .then(function ({ data, status }) {
      setTasks(data);
  })
  .catch(err => {
    console.log(err)
  })

  
  }

  return (
    <div>
      <center>
        <AddTask displayTasks={getTasks} />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {newElement}
        </ul>
      </center>
    </div>
  )
}
