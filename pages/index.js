import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import Auth from '../middlewares/auth_required'






export default function Home() {

  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
     
    getTasks() ;

  }, [tasks])

  function getTasks() {


    axios({
      url: 'todo/',
      headers: {
        Authorization: 'Token ' + token,
      },
      method: 'get',
    })
      .then(function ({ data }) {
        setTasks(data);
      })
      .catch(function (err) {

      })

  }

  



  return (
    <Auth>
      <div>
        <center>
          <AddTask getTasks={getTasks} />
          <ul className='flex-col mt-9 max-w-sm mb-3 '>
            <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
              Available Tasks
            </span>
            {tasks.map((task) => {
              return <TodoListItem key={task.id} id={task.id} title={task.title} getTasks={getTasks} />
            })}
          </ul>
        </center>
      </div>
    </Auth>
  )
}
