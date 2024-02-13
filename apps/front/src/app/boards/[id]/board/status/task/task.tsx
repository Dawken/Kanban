import React from 'react'
import { TaskProps } from '@src/types/task/taskProps'
import Draggable from '@src/components/ui/drag/draggable'

type TasksProps = {
    task: TaskProps
}

const Task = ({ task }: TasksProps) => {
    return (
        <Draggable
            id={task.id}
            data={{
                type: 'Task',
                item: task,
            }}
        >
            <div className='bg-black min-h-[90px] rounded mx-2 text-white'>
                <div className='p-2 text-sm'>{task.taskName}</div>
            </div>
        </Draggable>
    )
}

export default Task
