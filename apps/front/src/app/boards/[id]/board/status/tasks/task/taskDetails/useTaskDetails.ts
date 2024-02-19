import { useQuery } from '@apollo/client'
import { GET_BOARD_TASKS, GET_TASK } from '@src/graphQL/tasks/queries'
import useUpdateTaskName from '@src/hooks/task/useUpdateTaskName'
import { useParams } from 'next/navigation'

const useTaskDetails = (taskId: string) => {
    const params = useParams()

    const { data, loading } = useQuery(GET_TASK, { variables: { taskId } })

    const { updateTaskName, isTaskNameUpdating } = useUpdateTaskName()

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
                {
                    query: GET_TASK,
                    variables: {
                        taskId,
                    },
                },
            ],
        })
    }

    return {
        data,
        loading,
        updateName,
        isTaskNameUpdating,
    }
}
export default useTaskDetails
