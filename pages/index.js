import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'


export default function Home() {
  const { token } = useAuth()


  function getTasks() {
    axios
     ( {
       url:"https://todo-app-csoc.herokuapp.com/todo/",
       headers: {
         Authorization: 'Token ' + token,
       },
       method:"GET"
     })
     .then((response) => {
        let data=response.data;
        setTask(data);
      })
      .catch((error) => {
       console.log(error)
      })

  }
  const [tasks, setTask] = useState([])
  useEffect(()=>{
    getTasks()
  },[tasks])

  return (
    <div>
      <center>
        <AddTask getTasks={getTasks} />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {!tasks.length?<h1 className='dark:text-white text-gray-600 py-2'>No Todos</h1>:
           tasks.map((task)=> (<TodoListItem key={task.id} {...task} />))}
        </ul>
      </center>
    </div>
  )
}
