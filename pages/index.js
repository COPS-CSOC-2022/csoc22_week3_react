import TodoListItem from '../components/TodoListItem'
import Nav from '../components/Nav'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { API_URL } from '../utils/constants'
import auth_required from '../middlewares/auth_required'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Home() {
    let [todotaskList, setTodoTaskList] = useState([]);
    let {ProfileName,avatarImage}=useAuth();
    let {setAvatarImage,setProfileName}=useAuth();
  // let taskList=[];
  function getTasks() {
     axios({
      headers: {
          Authorization: "token " + localStorage.getItem("token")
      },
      url: API_URL + "todo/",
      method: "get"
  })
      .then((res)=>{
          const { data, status } = res;
         
          setTodoTaskList(data);
          // data.forEach(ta => {
          //   taskList.push(ta); 
          // });
          // setTaskList(taskList);

          //  console.log(taskList);
      })
      .catch((err)=>{
        toast.error('Error found!');
      });


  }

  const addNewTask = (taskToAdd) => {
    const toadd = [...todotaskList, taskToAdd];
    setTodoTaskList(toadd)
   
  //  temp.forEach(ta => {
  //   taskList.push(ta); 
  // });
  //    setTaskList(taskList);
      
};

const deleteTask = (id) => {
    let toadd = [...todotaskList];
    toadd = toadd.filter((task) => {
        return task.id != id;
    });

      setTodoTaskList(toadd)

// temp.forEach(ta => {
//   taskList.push(ta); 
// });
//  setTaskList(taskList);
};

useEffect(() => {
    auth_required();
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
          //  toast.error('Error found!')
           console.error(err);
        });
}, []);

  return (
    <div >
      <center>
        <AddTask addNewTask={addNewTask} />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <br/>
                    <div className="tasks text-black">
                    {todotaskList.map((task) => (
                       <TodoListItem task={task.title} id={task.id} key={task.id}
                      deleteTask={deleteTask}
                       className="text-black" />
                    ))}
                    </div>
        </ul>
      </center>
     
    </div>
  )
}
