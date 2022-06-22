import React, { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import Home from "../pages/index";


export default function AddTask() {
  const [Task, setTask] = useState("");
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
      Home();
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
