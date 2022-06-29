import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { API_URL } from '../utils/constants'
import { auth_required } from '../middlewares/auth_required'
import React from 'react'

export default function Home() {
  
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])

  auth_required()
  
  function getTasks() {
    axios({
      headers: {
        Authorization: 'Token ' + token
      },
      url: API_URL + 'todo/',
      method: 'get',
    }).then(function({data,status}){
      setTasks(data)
    }).catch((error)=>{
      console.log('An error occurred!')
    })
  }

  useEffect(()=>{getTasks()},[tasks])

  return (
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-black py-1 mb-5 px-9  text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          { Array.from(tasks).map((event)=>{return <TodoListItem key={event.id} id={event.id} title={event.title} />}) }
        </ul>
      </center>
    </div>
  )
}
