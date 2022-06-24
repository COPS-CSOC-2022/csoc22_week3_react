import TodoListItem from '../components/TodoListItem'
import React, { useState } from "react";
import axios from "../utils/axios";

function load_task(last_tasks) {
  const TodoList = document.getElementById('TodoList');
  const li = document.createElement('li');
  li.className = 'border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2';
  li.id = last_tasks.id;

  const input = document.createElement('input');
  input.id = 'input-button-' + last_tasks.id;
  input.type = 'text';
  input.className = 'hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input';
  input.placeholder = 'Edit The Task';

  const div = document.createElement('div');
  div.id = 'done-button-' + last_tasks.id;
  div.className = 'hideme';

  const button = document.createElement('button');
  button.id = 'done' + last_tasks.id;
  button.className = 'bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task';
  button.type = 'button';
  button.innerHTML = 'Done';

  div.appendChild(button);

  const tasks = document.createElement('div');
  tasks.id = 'task-' + last_tasks.id;
  tasks.className = 'todo-task  text-gray-600';
  tasks.innerHTML = last_tasks.title;

  const taskActions = document.createElement('span');
  taskActions.id = 'task-actions-' + last_tasks.id;
  taskActions.className = '';

  const editbutton = document.createElement('button');
  editbutton.style = { marginRight: "5px" };
  editbutton.type = 'button';

  editbutton.onclick = () => {
    TodoListItem(last_tasks.id, 'edit');
  }

  editbutton.className = 'bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2';
  editbutton.innerHTML = '<img src="https://img.icons8.com/color/48/000000/edit.png" />';

  const deletebutton = document.createElement('button');
  deletebutton.type = 'button';
  deletebutton.className = 'bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2';

  deletebutton.onclick = () => {
    TodoListItem(last_tasks.id, 'delete');
  }

  deletebutton.innerHTML = '<img src="https://img.icons8.com/color/48/000000/delete-sign.png" />';

  taskActions.appendChild(editbutton);
  taskActions.appendChild(deletebutton);

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(tasks);
  li.appendChild(taskActions);
  TodoList.appendChild(li);
}

export default function AddTask() {
  const [Task, setTask] = useState("");

  function temporary_get_Task() {
    axios({
      url: 'todo/',
      method: 'get',
      headers: {
        Authorization: 'token ' + localStorage.getItem('token')
      }
    }).then(res => {
      const last_task = res.data[res.data.length - 1];
      load_task(last_task);
    }).catch(err => {
      console.log(err)
    })
  }



  const addTask = () => {
    const The_data = {
      title: Task
    }
    if (Task == "" || Task == null) {
      alert("invalid Task");
      return;
    }
    axios({
      url: 'todo/create/',
      method: 'post',
      data: The_data,
      headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
      }
    }).then(function () {
      setTask("");

      temporary_get_Task();

    }
    ).catch(function (err) {
      console.log(err);
    }
    )
  };


  return (
    <div className="flex items-center max-w-sm mt-24">
      <input
        type="text"
        className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
        placeholder="Enter Task"
        value={Task}
        onChange={(e) => { setTask(e.target.value) }}
      />
      <button
        type="button"
        className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}
