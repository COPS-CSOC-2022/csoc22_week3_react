/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/auth";

export default function TodoListItem(e) {
  const [showedit, setShowEdit] = useState(false);
  const [updateData, setUpdateData] = useState();
  const { token } = useAuth();
  const editTask = (id) => {
    setShowEdit(!showedit);

  }

  const deleteTask = (id) => {
    axios({
      url:"https://todo-app-csoc.herokuapp.com/todo/"+id+"/",
      headers:{
        Authorization: 'Token ' + token
      },
      method:"DELETE"
      
    }).then((res)=>{
      console.log("success")
    }).catch((err)=>{
      console.log("error")
    })

  }

  const updateTask = (id) => {
    const dataForUpdate = {
      title: updateData
    }
    if(token){
      axios({
        url:"https://todo-app-csoc.herokuapp.com/todo/"+id+"/",
        headers:{
          Authorization: 'Token ' + token
        },
        data:dataForUpdate,
        method:"patch"

      }).then((res)=>{
        setShowEdit(!showedit)
        setUpdateData('')
      }).catch((err)=>{
        console.log("error")
      })
    }

  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={"input-button-"+e.id}
          type="text"
          className={`${
            showedit ? "" : "hideme"
          } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
          placeholder="Edit The Task"
          onChange={(e) => {
            setUpdateData(e.target.value);
          }}
          value={updateData}
        />
        <div id={'done-button-'+e.id} className={`${showedit ? "" : "hideme"}`}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(e.id)}
          >
            
          </button>
        </div>
        <div id={'task-'+e.id} className='todo-task  text-gray-600'>
          {e.title}
        </div>
        <span id={'task-actions-'+e.id} className={`${!showedit ? "" : "hideme"}`}>
          <button
          style={{ marginRight: "5px" }}
          type="button"
          onClick={() => editTask(e.id)}
          className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={() => deleteTask (e.id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    </>
  )
}
