import { useMutation } from '@apollo/client'
import { useParams } from 'next/navigation'
import { UPDATE_TASK_NAME } from '@src/graphQL/tasks/mutations'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { toast } from 'react-toastify'

const useTask = () => {
    const params = useParams()

    const [updateTaskName, { loading: isTaskNameUpdating }] = useMutation(
        UPDATE_TASK_NAME,
        {
            onCompleted: () => {
                toast.success('Task name updated')
            },
            onError: () => {
                toast.error('Task name update failed')
            },
        }
    )

    const updateName = (taskName: string, taskId: string) => {
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
        updateName,
        isTaskNameUpdating,
    }
}
export default useTask
