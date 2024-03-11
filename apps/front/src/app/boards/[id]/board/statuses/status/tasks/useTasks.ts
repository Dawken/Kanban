import { useMemo } from 'react'
import { TaskProps } from '@src/types/task/taskProps'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { CREATE_TASK } from '@src/graphQL/tasks/mutations'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { useParams } from 'next/navigation'
import useTextState from '@src/hooks/useTextState'

const useTasks = (tasks: TaskProps[]) => {
    const params = useParams()

    const [createTask, { loading: isTaskCreating }] = useMutation(CREATE_TASK, {
        onError: () => {
            toast.error('Task creation failed')
        },
    })

    const { text: newTaskName, handleChange } = useTextState()

    const addNewTask = (
        taskName: string,
        statusId: string,
        description?: string
    ) => {
        handleChange(taskName)
        createTask({
            variables: {
                taskName,
                statusId,
                description,
            },
            refetchQueries: [
                {
                    query: GET_BOARD_TASKS,
                    variables: {
                        boardId: params.id,
                    },
                },
            ],
        })
    }

    const tasksIds = useMemo(() => {
        return tasks && tasks.map((task) => task.id)
    }, [tasks])

    return {
        tasksIds,
        isTaskCreating,
        addNewTask,
        newTaskName,
    }
}
export default useTasks
