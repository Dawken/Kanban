import { useParams } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { UPDATE_TASK_NAME } from '@src/graphQL/tasks/mutations'
import { toast } from 'react-toastify'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import useTextState from '@src/hooks/useTextState'

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
    return {
        isTaskNameUpdating,
        updateName,
        newTaskName,
    }
}
export default useUpdateTaskName
