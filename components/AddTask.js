import React, { useState } from 'react'
import axios from '../utils/axios'
import TodoListItem from './TodoListItem'
// const API_BASE_URL = "https://todo-app-csoc.herokuapp.com/";

export default function AddTask() {
  const [todoInput, setTodoInput] = useState('')
  const [todoCollection, setTodoCollection] = useState('')
  const Tasks = [];
  function showAddedTask() {
    axios({
      url: 'todo/',
      method: 'get',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      },
    }).then(res => {
      res.data.forEach(Data => {
        Tasks.push(Data)
      });
      const TodoList = document.getElementById('TodoList');
      const task = Tasks[Tasks.length - 1];

      console.log(task);
      const li = document.createElement('li');
      li.className = 'border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2';
      li.id = task.id;

      const input = document.createElement('input');
      input.id = 'input-button-' + task.id;
      input.type = 'text';
      input.className = 'hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input';
      input.placeholder = 'Edit The Task';

      const div = document.createElement('div');
      div.id = 'done-button-' + task.id;
      div.className = 'hideme';

      const button = document.createElement('button');
      button.id = 'done' + task.id;
      button.className = 'bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task';
      button.type = 'button';
      button.innerHTML = 'Done';

      div.appendChild(button);

      const tasks = document.createElement('div');
      tasks.id = 'task-' + task.id;
      tasks.className = 'todo-task  text-gray-600';
      tasks.innerHTML = task.title;

      const taskActions = document.createElement('span');
      taskActions.id = 'task-actions-' + task.id;
      taskActions.className = '';

      const editbutton = document.createElement('button');
      editbutton.style = { marginRight: "5px" };
      editbutton.type = 'button';

      editbutton.onclick = () => {
        TodoListItem(task.id, 'edit');
      }

      editbutton.className = 'bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2';
      editbutton.innerHTML = '<img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png" width="20px" height="20px"/>';


      const deletebutton = document.createElement('button');
      deletebutton.type = 'button';
      deletebutton.className = 'bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2';



      deletebutton.onclick = () => {
        TodoListItem(task.id, 'delete');
      }

      deletebutton.innerHTML = '<img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"  width="20px" height="20px"/>';

      taskActions.appendChild(editbutton);
      taskActions.appendChild(deletebutton);

      li.appendChild(input);
      li.appendChild(div);
      li.appendChild(tasks);
      li.appendChild(taskActions);
      TodoList.appendChild(li);

    }
    ).catch(err => {
      console.log(err)
    })
  }



  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */

    const dataForApiRequest = {
      title: todoInput,
    }
    if (todoInput === '') {
      alert("Please enter a task");
    }
    else {
      const token = localStorage.getItem('token');
      axios({
        url: 'todo/create/',
        method: 'post',
        headers: {
          'Authorization': 'token ' + token
        },
        data: dataForApiRequest,
      }).then(function ({ data, status }) {
        // todoInput = '';
        setTodoInput('');
        // console.log(123);
        // location.reload();
        showAddedTask();
      }).catch(function (err) {
        alert('An error occured while adding the task');
        console.log(err)
      }
      )
    }
  }
  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />

      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
