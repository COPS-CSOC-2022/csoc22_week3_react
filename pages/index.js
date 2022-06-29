import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { auth_required } from '../middlewares/auth_required'

export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  
  auth_required();
  
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
      url: 'https://todo-app-csoc.herokuapp.com/' + 'todo/',
       method: 'get',
  
     })
     .then(function (res){
      console.log(res)
      setTasks(res.data)
      

      
      
     }
      )
      .catch(err=>{console.log(err)})
  }
useEffect(()=>{
  getTasks()
},[])

let list=tasks.map(task=>(
  <TodoListItem key={task.id}{...task}>


  </TodoListItem>
  
))

function refget(){
  getTasks()
  list=tasks.map(task=>(
    <TodoListItem key={task.id}{...task}>
  
  
    </TodoListItem>
    
  ))
}




  return (
    <div>
      <center>
        <AddTask refget={refget} />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            <h1 className='neonText'>Available Tasks</h1>
          </span>
          
          {/* <TodoListItem></TodoListItem> */}
         {list}
        </ul>
      </center>
    </div>
  )
}
