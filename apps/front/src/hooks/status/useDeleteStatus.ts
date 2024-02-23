import { useMutation } from '@apollo/client'
import { DELETE_STATUS } from '@src/graphQL/status/mutations'
import { toast } from 'react-toastify'
import { GET_BOARD } from '@src/graphQL/boards/queries'
import { useParams } from 'next/navigation'

const useDeleteStatus = () => {
    const params = useParams()

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
            refetchQueries: [
                {
                    query: GET_BOARD,
                    variables: {
                        boardId: params.id,
                    },
                },
            ],
        })
    }

    return { removeStatus, isStatusRemoving }
}

export default useDeleteStatus
