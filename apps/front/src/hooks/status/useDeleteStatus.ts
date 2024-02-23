import { GET_BOARDS } from '@src/graphQL/boards/queries'
import { useMutation } from '@apollo/client'
import { DELETE_STATUS } from '@src/graphQL/status/mutations'
import { toast } from 'react-toastify'

const useDeleteStatus = () => {
    const [deleteStatus, { loading: isStatusRemoving }] = useMutation(
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
                statusId,
            },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    return { removeStatus, isStatusRemoving }
}

export default useDeleteStatus
