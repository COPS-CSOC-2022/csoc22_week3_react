/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import React from "react";
import { API_URL } from "../utils/constants"
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoListItem(ids, targets) {





  if (targets == 'delete') {
    deleteTask(ids)
  }
  if (targets == 'edit') {
    editTask(ids)
  }

  function deleteTask(id) {
    const the_task = document.getElementById(id)

    axios({
      url: API_URL + 'todo/' + id + "/",
      method: 'delete',
      headers: {
        authorization: 'token ' + localStorage.getItem('token')
      }
    }).then(() => {
      the_task.remove();
      toast.success("Task Deleted");
    }).catch((err) => {
      toast.error("Task Not Deleted,something went wrong");
      console.log(err);
    })
  }

  function editTask(id) {
    const the_task = document.getElementById(id)
    const input = document.getElementById('input-button-' + id);
    const done_div = document.getElementById('done-button-' + id);
    const task_title = document.getElementById('task-' + id);
    const task_action = document.getElementById('task-actions-' + id);

    the_task.classList.remove('hideme');
    input.classList.remove('hideme');
    done_div.classList.remove('hideme');
    task_title.classList.add('hideme');
    task_action.classList.add('hideme');

    const done = document.getElementById('done' + id);
    done.addEventListener('click', () => {
      const input_value = input.value;
      if (input_value === '') {
        toast.error('invalid Task');
        return;
      }
      if (input_value === task_title.innerHTML) {
        toast.error('nothing changed');
        return
      }
      else {
        updateTask(id, input_value)
      }
    })
  }

  const updateTask = (id, input_value) => {
    toast.warn('Updating Task');
    axios({
      url: API_URL + 'todo/' + id + "/",
      method: 'put',
      headers: {
        authorization: 'token ' + localStorage.getItem('token')
      },
      data: {
        title: input_value
      }
    }).then(() => {
      const input = document.getElementById('input-button-' + id);
      const done_div = document.getElementById('done-button-' + id);
      const task_title = document.getElementById('task-' + id);
      const task_action = document.getElementById('task-actions-' + id);
      input.value = '';
      input.classList.add('hideme');
      done_div.classList.add('hideme');
      task_title.classList.remove('hideme');
      task_action.classList.remove('hideme');
      task_title.innerHTML = input_value;
      toast.success('task updated successfully')
    }
    ).catch((err) => {
      toast.error('something wrong!,do it again')
      console.log(err);
    }
    )
  };


  return (
    <>
      <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2" style={{ backgroundColor: '#8BD3DD' }}>
        {/* <input
          id="input-button-1"
          type="text"
          className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
          placeholder="Edit The Task"
        />
        <div id="done-button-1" className="hideme">
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
            type="button"
          // onClick={updateTask(1)}
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
            // onClick={editTask(1)}
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
        </span> */}
      </li>
    </>
  );
}
