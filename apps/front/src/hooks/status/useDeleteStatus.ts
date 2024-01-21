import GET_BOARDS from '@src/graphQL/boards/queries'
import { useMutation } from '@apollo/client'
import { DELETE_STATUS } from '@src/graphQL/status/mutations'
import { toast } from 'react-toastify'

const useDeleteStatus = () => {
    const [deleteStatus, { loading: isDeletingStatus }] = useMutation(
        DELETE_STATUS,
        {
            onCompleted: () => {
                toast.success('Status has been deleted')
            },
            onError: () => {
                toast.error('Status deletion failed')
            },
        }
    )

    const removeStatus = (statusId: string) => {
        deleteStatus({
            variables: {
                statusId: statusId,
            },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    return { removeStatus, isDeletingStatus }
}

export default useDeleteStatus
