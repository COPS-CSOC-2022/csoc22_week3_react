import TodoListItem from '../components/TodoListItem'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import AddTask from '../components/AddTask'



export default function Home() {
  const [Tasks, setTasks] = useState([]);


  function getTasks() {
    while (Tasks.length > 0) {
      Tasks.pop();
    }
    axios({
      url: 'todo/',
      method: 'get',
      headers: {
        Authorization: 'token ' + localStorage.getItem('token')
      }
    }).then(res => {
      res.data.forEach(Data => {
        Tasks.push(Data)
      });
      setTasks(Tasks);
      const TodoList = document.getElementById('TodoList');
      TodoList.innerHTML = '';
      Tasks.forEach(task => {
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
        editbutton.innerHTML = '<img src="https://img.icons8.com/color/48/000000/edit.png" />';

        const deletebutton = document.createElement('button');
        deletebutton.type = 'button';
        deletebutton.className = 'bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2';

        deletebutton.onclick = () => {
          TodoListItem(task.id, 'delete');
        }

        deletebutton.innerHTML = '<img src="https://img.icons8.com/color/48/000000/delete-sign.png" />';

        taskActions.appendChild(editbutton);
        taskActions.appendChild(deletebutton);

        li.appendChild(input);
        li.appendChild(div);
        li.appendChild(tasks);
        li.appendChild(taskActions);
        TodoList.appendChild(li);
      });
    }
    ).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => { getTasks() }, []);
  return (
    <div>
      <center>
        <AddTask />
        <span className='inline-block bg-blue-600 py-1 mt-9 px-9 text-sm text-white font-bold rounded-full '>
          Available Tasks
        </span>
        <ul className='flex-col mt-9 max-w-sm mb-3 ' id='TodoList'>
          <TodoListItem />
        </ul>
      </center>
    </div>
  )
}

