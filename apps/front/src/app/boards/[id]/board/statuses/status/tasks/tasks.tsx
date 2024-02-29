import React from 'react'
import { SortableContext } from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import { TaskProps } from '@src/types/task/taskProps'
import AddTaskTextField from '@src/app/boards/[id]/board/statuses/status/tasks/addTaskTextField'
import useTasks from '@src/app/boards/[id]/board/statuses/status/tasks/useTasks'
import Task from '@src/app/boards/[id]/board/statuses/status/tasks/task/task'
import { StatusProps } from '@src/types/status/statusProps'
import { DragIdProps } from '@src/types/dragIdProps'

type TasksProps = {
    tasks: TaskProps[]
    status: StatusProps
    isCreateTaskOpen: boolean
    isTaskOrderUpdating?: boolean
    handleOpenCreateTask: () => void
    handleCloseCreateTask: () => void
    hideCreateTask?: boolean
    dragId: DragIdProps
}
const Tasks = ({
    tasks,
    status,
    isCreateTaskOpen,
    isTaskOrderUpdating,
    handleOpenCreateTask,
    handleCloseCreateTask,
    hideCreateTask,
    dragId,
}: TasksProps) => {
    const { tasksIds, isTaskCreating, addNewTask } = useTasks(tasks)

    return (
        <SortableContext items={tasksIds}>
            <div className='text-sm font-sans flex-1'>
                {tasks.length > 0 ? (
                    <>
                        <div className='flex flex-col gap-1'>
                            {tasks.map((task) => {
                                return (
                                    <Task
                                        task={task}
                                        isTaskOrderUpdating={
                                            isTaskOrderUpdating
                                        }
                                        dragId={dragId}
                                        key={task.id}
                                    />
                                )
                            })}
                        </div>
                        {isCreateTaskOpen ? (
                            <div className='m-1'>
                                <AddTaskTextField
                                    handleCloseCreateTask={
                                        handleCloseCreateTask
                                    }
                                    addNewTask={addNewTask}
                                    statusId={status.id}
                                    isTaskCreating={isTaskCreating}
                                />
                            </div>
                        ) : (
                            <div
                                className={`bg-inherit hover:bg-neutral-900 ${
                                    !hideCreateTask && 'sticky bottom-0'
                                } font-sans text-sm z-30`}
                            >
                                <div
                                    className='flex justify-start items-center p-2 cursor-pointer opacity-0 hover:opacity-100 transition-all'
                                    onClick={handleOpenCreateTask}
                                >
                                    <AddIcon />
                                    Create Task
                                </div>
                            </div>
                        )}
                    </>
                ) : isCreateTaskOpen ? (
                    <div className='mx-1'>
                        <AddTaskTextField
                            handleCloseCreateTask={handleCloseCreateTask}
                            addNewTask={addNewTask}
                            statusId={status.id}
                            isTaskCreating={isTaskCreating}
                        />
                    </div>
                ) : (
                    <div
                        className='bg-black opacity-50 min-h-[95px] rounded mx-1 flex items-center justify-center flex-1 hover:bg-blue-600 hover:bg-opacity-10 cursor-pointer'
                        onClick={handleOpenCreateTask}
                    >
                        <AddIcon />
                        Create Task
                    </div>
                )}
            </div>
        </SortableContext>
    )
}

export default Tasks
