import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { API_URL } from '../utils/constants'
import  authRequired  from '../middlewares/auth_required'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'


export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])


  authRequired();

  function getTasks() {

    axios({
        headers: {
          Authorization: 'Token ' + token
        },
        url: API_URL + 'todo/',
        method: 'GET',
    }).then(function ({ data, status }) {
        setTasks(data);
        // console.log(data)
    }).catch(err => {
      console.log("error")
    });
  }
  
    useEffect(() => {
    if (token != undefined)getTasks();
  }, [tasks])



  return (
    <>
    <div>
      <center>
        <AddTask displayTasks={getTasks}/>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.map(task => {
            return <TodoListItem key={task.id} id={task.id} task={task.title} displayTasks={getTasks} />
          })}
        </ul>
      </center>
    </div>
    
    </>
  )
}
