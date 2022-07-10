import { useState } from "react"

export default function Search({ allTasks, setTasks, setQuery }) {

  const onChange = (e) => {
    const a = e.target.value
    setTasks(allTasks.filter(({title}) => title.toLowerCase().indexOf(a.toLowerCase()) !== -1))
    setQuery(a.toLowerCase())
  }

  return (
    <div className='flex items-center max-w-sm mt-10'>
      <input
        type='text'
        className='px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Search'
        onChange={onChange}
      />
    </div>
  )
}