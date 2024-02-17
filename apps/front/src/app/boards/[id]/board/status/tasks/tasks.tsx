import React from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from '@src/app/boards/[id]/board/status/tasks/task/task'
import AddIcon from '@mui/icons-material/Add'
import useTasks from '@src/app/boards/[id]/board/status/tasks/useTasks'
import { TaskProps } from '@src/types/task/taskProps'
import AddTaskTextField from '@src/app/boards/[id]/board/status/tasks/addTaskTextField'

type TasksProps = {
    tasks: TaskProps[]
    statusId: string
    isCreateTaskOpen: boolean
    handleOpenCreateTask: () => void
    handleCloseCreateTask: () => void
}
const Tasks = ({
    tasks,
    statusId,
    isCreateTaskOpen,
    handleOpenCreateTask,
    handleCloseCreateTask,
}: TasksProps) => {
    const { tasksIds, isTaskCreating, addNewTask } = useTasks(tasks)

    return (
        <div className='text-sm font-sans'>
            {tasks.length > 0 ? (
                <>
                    <div className='flex-1 flex flex-col mt-2 flex-grow h-full gap-1'>
                        <SortableContext
                            items={tasksIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {tasks.map((task) => {
                                return <Task task={task} key={task.id} />
                            })}
                        </SortableContext>
                    </div>
                    {isCreateTaskOpen ? (
                        <div className='my-1'>
                            <AddTaskTextField
                                handleCloseCreateTask={handleCloseCreateTask}
                                addNewTask={addNewTask}
                                statusId={statusId}
                                isTaskCreating={isTaskCreating}
                            />
                        </div>
                    ) : (
                        <div
                            className='flex justify-start items-center p-2 cursor-pointer opacity-0 hover:opacity-100 transition-all'
                            onClick={handleOpenCreateTask}
                        >
                            <AddIcon />
                            Create Task
                        </div>
                    )}
                </>
            ) : isCreateTaskOpen ? (
                <div className='mt-2'>
                    <AddTaskTextField
                        handleCloseCreateTask={handleCloseCreateTask}
                        addNewTask={addNewTask}
                        statusId={statusId}
                        isTaskCreating={isTaskCreating}
                    />
                </div>
            ) : (
                <div
                    className='bg-black opacity-50 min-h-[95px] rounded mx-1 mt-2 flex items-center justify-center flex-1 hover:bg-blue-600 hover:bg-opacity-10 cursor-pointer'
                    onClick={handleOpenCreateTask}
                >
                    <AddIcon />
                    Create Task
                </div>
            )}
        </div>
    )
}

export default Tasks
