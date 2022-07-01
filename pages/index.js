import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { API_URL } from '../utils/constants'
import authRequired from '../middlewares/auth_required'
import noAuthRequired from '../middlewares/no_auth_required'

export default function Home() {
  
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  
  authRequired();
  noAuthRequired();

  useEffect(()=>{
    getTasks();
  },[]);


  function getTasks() {
      /***
       * @todo Fetch the tasks created by the user.
       * @todo Set the tasks state and display them in the using TodoListItem component
       * The user token can be accessed from the context using useAuth() from /context/auth.js
       */
      axios({
        headers: {
            Authorization: "Token " + token,
        },
        url: API_URL+ 'todo/',
        method: 'get',
          })
            .then(function ({ data, status }) {
              console.log(data);
              setTasks(data);
            })
             .catch(function (err) {
              console.log(err);
          })
        
}
return (
    <div >
      <center>
       <div>
       <AddTask getTasks={getTasks} />
       </div>
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full login-container '>
            Available Tasks
          </span>
          {tasks.map((todo)=>{
            return(
             <div className='tasks rounded tasks' key={todo.id}>
               <TodoListItem task={todo} getTasks={getTasks}/>
             </div>
            )
          })}
         </ul>
        </center>
    </div>
  )
}
