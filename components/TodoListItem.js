/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../context/auth"
import axios from '../utils/axios'
import Home from "../pages"
import { purple } from "@material-ui/core/colors"
export default function TodoListItem(props) {
  const {token}=useAuth()
  
  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
     document.getElementById("task-" + id).classList.add("hideme");
     document.getElementById("task-actions-" + id).classList.add("hideme");
     document.getElementById("input-button-" + id).classList.remove("hideme");
     document.getElementById("done-button-" + id).classList.remove("hideme");

  }

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    let temp_id=id
     axios({
      headers: {
          Authorization: "Token " + token,
      },
      url: 'https://todo-app-csoc.herokuapp.com/' + 'todo/'+ id +'/',
       method: 'DELETE',
  
     })
     .then(function (data, status) {
      console.log(data)
      toast.success("Item deleted successfully");
      document.getElementById("li-" + id).remove();
     
        
    })
    .catch(function (err) {console.log(id);
      toast.error("Your Request couldn't be completed");
    

     })
    console.log("delete")
}
  

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
     const updateTitle = document.getElementById("input-button-" + id).value;
     const dataForApiRequest = {
       id: id,
       title: updateTitle,
     };
     console.log(dataForApiRequest);
     axios({
       headers: {
         Authorization: "Token " + token,
       },
       url: "https://todo-app-csoc.herokuapp.com/" + "todo/" + id + "/",
       method: "patch",
       data: dataForApiRequest,
     })
       .then(function ({ data, status }) {
         document.getElementById("task-" + id).classList.remove("hideme");
         document.getElementById("task-actions-" + id).classList.remove("hideme");
         document.getElementById("input-button-" + id).classList.add("hideme");
         document.getElementById("done-button-" + id).classList.add("hideme");
         const update = document.getElementById("task-" + id);
         update.textContent = updateTitle;
         
         update.style.color='purple'
         update.style.fontSize='20px'
         update.style.fontFamily='cursive'
       })
       .catch(function (err) {
         toast.error("Some Unknown Error Occurred!");
       });




  }

  return (
    <>
  <div id="alltodos"> { props.id && <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'id={`li-${props.id}`}>
        <input
          id={`input-button-${props.id}`}
          type='text'
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
          
        />
        <div id={`done-button-${props.id}`} className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(props.id)}
          >
            Done
          </button>
        </div>
        <div id={`task-${props.id}`} className='todo-task  text-gray-600'
        
        >
         <h1 style={{ fontSize: 20 ,color:'purple', fontFamily: 'cursive'}}> {props.title}</h1>

        </div>
        <span id={`task-actions-${props.id}`} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(props.id)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
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
            onClick={()=>deleteTask(props.id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>}
      </div>
    </>
  )
}
