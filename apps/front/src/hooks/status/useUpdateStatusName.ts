import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { UPDATE_STATUS_NAME } from '@src/graphQL/status/mutations'

const useUpdateStatusName = () => {
    const [updateStatusName, { loading: isStatusNameUpdating }] = useMutation(
        UPDATE_STATUS_NAME,
        {
            onCompleted: () => {
                toast.success('Status name updated')
            },
            onError: () => {
                toast.error('Status name update failed')
            },
        }
    )

    const editStatusName = (statusName: string, statusId: string) => {
        if (statusName.length < 1) {
            return toast.error('Status name cannot be empty')
        } else {
            updateStatusName({
                variables: {
                    statusName,
                    statusId,
                },
            })
        }
    }

    return { isStatusNameUpdating, editStatusName }
}
export default useUpdateStatusName
