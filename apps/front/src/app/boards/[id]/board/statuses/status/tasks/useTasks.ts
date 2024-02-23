import { useMemo } from 'react'
import { TaskProps } from '@src/types/task/taskProps'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { CREATE_TASK } from '@src/graphQL/tasks/mutations'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { useParams } from 'next/navigation'

const useTasks = (tasks: TaskProps[]) => {
    const params = useParams()

    const [createTask, { loading: isTaskCreating }] = useMutation(CREATE_TASK, {
        onCompleted: () => {
            toast.success('Task created')
        },
        onError: () => {
            toast.error('Task creation failed')
        },
    })

    const addNewTask = (
        taskName: string,
        statusId: string,
        description?: string
    ) => {
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
    }
}
export default useTasks
