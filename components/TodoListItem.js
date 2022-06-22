/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import React from "react";
import { API_URL } from "../utils/constants"
import { useState, useEffect } from "react";

export default function TodoListItem(ids, targets) {

  // console.log(ids, targets);

  if (targets == 'delete') {
    deleteTask(ids)
  }
  if (targets == 'edit') {
    editTask(ids)
  }
  if (targets == 'update') {
    updateTask(ids)
  }

  function deleteTask(id) {
    // console.log(id + "delete");
    const the_task = document.getElementById(id)

    axios({
      url: API_URL + 'todo/' + id + "/",
      method: 'delete',
      headers: {
        authorization: 'token ' + localStorage.getItem('token')
      }
    }).then((res) => {
      the_task.remove();
      console.log(res);
      alert('task removed successfully')
    }).catch((err) => {
      alert('something wrong!,do it again')
      console.log(err);
    })


    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
  }

  function editTask(id) {
    // console.log(id + "edit");
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
  }
  const updateTask = (id) => {
    // console.log(id + "update");
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  };


  return (
    <>
      <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
        <input
          id="input-button-1"
          type="text"
          className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          placeholder="Edit The Task"
        />
        <div id="done-button-1" className="hideme">
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
            onClick={updateTask(1)}
          >
            Done
          </button>
        </div>



        <div id="task-1" className="todo-task  text-gray-600">
          Sample Task 1
        </div>


        <span id="task-actions-1" className="">
          <button
            style={{ marginRight: "5px" }}
            type="button"
            onClick={editTask(1)}
            className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
              width="18px"
              height="20px"
              alt="Edit"
            />
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
            onClick={() => deleteTask(1)}
          >
            <img
              src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
              width="18px"
              height="22px"
              alt="Delete"
            />
          </button>
        </span>
      </li>
    </>
  );
}
