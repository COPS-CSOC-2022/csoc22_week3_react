import TodoListItem from '../components/TodoListItem'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import AddTask from '../components/AddTask'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isTokennotPresent from '../middlewares/auth_required';
import isTokenPresent from '../middlewares/no_auth_required';
import { useAuth } from '../context/auth';
import { API_URL } from '../utils/constants';
export default function Home() {

  const [Tasks, setTasks] = useState([]);
  let { setAvatarImage, setProfileName } = useAuth();
  function getTasks() {
    toast.success('successfully logged in');
    toast.info('loading tasks...');
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
        li.className = 'border flex border-gray-500 font-bold text-blue-900 rounded-2xl shadow-md p-2 justify-between items-center mb-2  hover:text-white  hover:bg-pink-300';
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
        tasks.className = 'todo-task  ';
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

        editbutton.className = 'bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded-xl m-2 p-1';
        editbutton.innerHTML = '<img src="https://img.icons8.com/color/48/000000/edit.png" />';

        const deletebutton = document.createElement('button');
        deletebutton.type = 'button';
        deletebutton.className = 'bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded-xl m-2 p-1';

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
      toast.success('Tasks Loaded Successfully');
    }
    ).catch(err => {
      toast.error('An error occured');
      console.log(err)
    })
  }
  useEffect(() => { isTokennotPresent() }, []);
  useEffect(() => { isTokenPresent() }, []);
  useEffect(() => {
    isTokenPresent();
    axios
      .get(API_URL + "auth/profile/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
      .then((res) => {
        setAvatarImage(
          "https://ui-avatars.com/api/?name=" +
          res.data.name +
          "&background=faebd7&size=33&color=007bff"
        );
        setProfileName(res.data.name);
        getTasks();

      })
      .catch((err) => {
        toast.error('Error found!')
        console.error(err);
      });
  }, []);
  return (
    <div >
      <center>
        <AddTask />
        <span className='inline-block py-1 mt-9 px-9 text-sm text-white font-bold rounded-full ' style={{ backgroundColor: '#F582AE', color: '#001858' }} >
          Available Tasks
        </span>
        <ul className='flex-col mt-9 max-w-sm mb-3 ' id='TodoList'>
          <TodoListItem />
        </ul>
      </center>
    </div >
  )
}

