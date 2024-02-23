import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { DELETE_TASK } from '@src/graphQL/tasks/mutations'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { useParams } from 'next/navigation'

const useDeleteTask = () => {
    const [deleteTask, { loading: isTaskRemoving }] = useMutation(DELETE_TASK, {
        onCompleted: () => {
            toast.success('Task has been deleted')
        },
        onError: () => {
            toast.error('Task deletion failed')
        },
    })

    const params = useParams()

    const removeTask = (taskId: string) => {
        deleteTask({
            variables: {
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

    return { removeTask, isTaskRemoving }
}

export default useDeleteTask
