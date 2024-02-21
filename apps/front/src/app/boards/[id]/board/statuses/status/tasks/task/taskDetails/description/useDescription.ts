import { useMutation } from '@apollo/client'
import { UPDATE_DESCRIPTION } from '@src/graphQL/tasks/mutations'
import { toast } from 'react-toastify'
import { TaskProps } from '@src/types/task/taskProps'
import { GET_TASK } from '@src/graphQL/tasks/queries'

const useDescription = (taskId: string) => {
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
    const updateTaskDescription = (description: string) => {
        updateDescription({
            variables: {
                description,
                taskId,
            },
        })
    }

    return {
        isDescriptionUpdating,
        updateTaskDescription,
    }
}
export default useDescription
