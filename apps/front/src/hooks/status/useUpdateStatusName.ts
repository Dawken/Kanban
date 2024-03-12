import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { UPDATE_STATUS_NAME } from '@src/graphQL/status/mutations'
import useTextState from '@src/hooks/useTextState'

const useUpdateStatusName = () => {
    const [updateStatusName, { loading: isStatusNameUpdating }] = useMutation(
        UPDATE_STATUS_NAME,
        {
            onError: () => {
                toast.error('Status name update failed')
            },
        }
    )

    const { text: newStatusName, handleChange } = useTextState()
    const editStatusName = (statusName: string, statusId: string) => {
        handleChange(statusName)
        updateStatusName({
            variables: {
                statusName,
                statusId,
            },
        })
    }

    return { isStatusNameUpdating, editStatusName, newStatusName }
}
export default useUpdateStatusName
