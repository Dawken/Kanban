import { useMutation } from '@apollo/client'
import { UPDATE_TASK_NAME } from '@src/graphQL/tasks/mutations'
import { toast } from 'react-toastify'
import useTextState from '@src/hooks/useTextState'

const useUpdateTaskName = () => {
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
        })
    }
    return {
        isTaskNameUpdating,
        updateName,
        newTaskName,
    }
}
export default useUpdateTaskName
