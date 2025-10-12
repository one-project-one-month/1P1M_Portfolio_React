import React from 'react'
import Button from './Button'

const Title = () => {
  return (
    <div className='h-11 flex w-full justify-between items-center py-10'>

      <div><h1>Project Idea List</h1></div>

      <div className="">

      </div>

      <div className="flex justify-center items-center">
        <Button >Create</Button>
        <div className="flex justify-center items-center border rounded-full px-4 py-2">
            {/* filter icon */}
            <p>Filters</p>
        </div>
      </div>
    </div>
  )
}

export default Title
