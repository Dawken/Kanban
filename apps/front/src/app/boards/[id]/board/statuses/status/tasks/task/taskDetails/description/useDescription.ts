import { useMutation } from '@apollo/client'
import { UPDATE_DESCRIPTION } from '@src/graphQL/tasks/mutations'
import { toast } from 'react-toastify'

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
