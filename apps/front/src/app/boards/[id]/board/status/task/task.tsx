import React from 'react'
import { TaskProps } from '@src/types/task/taskProps'
import Draggable from '@src/components/ui/drag/draggable'

const Task = ({ task }: { task: TaskProps }) => {
    return (
        <Draggable
            id={task.id}
            data={{
                type: 'Task',
                item: task,
            }}
        >
            <div className='bg-black min-h-[90px] rounded mx-2'>
                {task.taskName}
            </div>
        </Draggable>
    )
}

export default Task
