import { useMutation, useQuery } from '@apollo/client'
import { GET_BOARD_TASKS, GET_TASK } from '@src/graphQL/tasks/queries'
import useUpdateTaskName from '@src/hooks/task/useUpdateTaskName'
import { useParams } from 'next/navigation'
import { UPDATE_DESCRIPTION } from '@src/graphQL/tasks/mutations'
import { toast } from 'react-toastify'
import { TaskProps } from '@src/types/task/taskProps'

const useTaskDetails = (taskId: string) => {
    const params = useParams()

    const { data, loading } = useQuery(GET_TASK, { variables: { taskId } })

    const [updateDescription, { loading: isDescriptionUpdating }] = useMutation(
        UPDATE_DESCRIPTION,
        {
            onCompleted: () => {
                toast.success('Description has been updated')
            },
            onError: () => {
                toast.error('Description update failed')
            },
            update: (cache, { data }) => {
                const { task } = cache.readQuery<{ task: TaskProps }>({
                    query: GET_TASK,
                    variables: { taskId },
                }) || { task: {} }

                if (!task) return

                cache.writeQuery({
                    query: GET_TASK,
                    variables: { taskId },
                    data: {
                        task: {
                            ...task,
                            ...data.updateDescription,
                        },
                    },
                })
            },
        }
    )

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

    const updateTaskDescription = (description: string) => {
        updateDescription({
            variables: {
                description,
                taskId,
            },
        })
    }

    return {
        data,
        loading,
        updateName,
        isTaskNameUpdating,
        updateTaskDescription,
        isDescriptionUpdating,
    }
}
export default useTaskDetails
