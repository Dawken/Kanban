import { useParams } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { UPDATE_TASK_NAME } from '@src/graphQL/tasks/mutations'
import { toast } from 'react-toastify'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import useTextState from '@src/hooks/useTextState'
import { TaskProps } from '@src/types/task/taskProps'

const useUpdateTaskName = () => {
    const params = useParams()

    const [updateTaskName, { loading: isTaskNameUpdating }] = useMutation(
        UPDATE_TASK_NAME,
        {
            onError: () => {
                toast.error('Task name update failed')
            },
        }
    )

    const { text: newTaskName, handleChange } = useTextState()

    const updateName = (taskName: string, taskId: string) => {
        handleChange(taskName)
        updateTaskName({
            variables: {
                taskName,
                taskId,
            },
            update: (cache, { data }) => {
                const { tasks } = cache.readQuery<{ tasks: TaskProps[] }>({
                    query: GET_BOARD_TASKS,
                    variables: { boardId: params.id },
                }) || { tasks: [] }

                if (!tasks) return

                const updatedTasks = tasks.map((task) =>
                    task.id === data.updateTaskName.id
                        ? data.updateTaskName
                        : task
                )

                cache.writeQuery({
                    query: GET_BOARD_TASKS,
                    variables: { boardId: params.id },
                    data: {
                        tasks: updatedTasks,
                    },
                })
            },
        })
    }
    return {
        isTaskNameUpdating,
        updateName,
        newTaskName,
    }
}
export default useUpdateTaskName
