import Btn from "./Btn"

export default function AddTask() {
  const addTask = () => {
    console.log("Addtask");
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
  }
  return (
    <div className='flex flex-col items-center  max-w-sm mt-24' style={{
    width:"40vw"
    }}>
      <input
        type='text'
        className='todo-add-task-input px-8 py-4 placeholder-blueGray-300 text-gray-500 rounded-lg text-sm border border-blueGray-300 focus:ring w-full'
        placeholder='Enter Task'
      />
      <div className="w-full" onClick={addTask}>
      <Btn data="Add Task"/>
      </div>
    </div>
  )
}
