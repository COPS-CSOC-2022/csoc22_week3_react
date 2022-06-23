export default function Btn({data}) {
  return (
    <div>
        <button
        type='button'
        className='todo-add-task text-sm px-4 py-4 hover:border-transparent mt-9 cursor-pointer text-white rounded-lg w-full focus:outline-none'
      >
        {data}
      </button>
    </div>
  )
}
