import React from 'react'
import { TaskProps } from '@src/types/task/taskProps'

const Task = ({ task }: { task: TaskProps }) => {
    return (
        <div className='bg-black min-h-[90px] rounded mx-1'>
            {task.taskName}
        </div>
    )
}

export default Task
