import { useMutation } from '@apollo/client'
import { CREATE_STATUS } from '@src/graphQL/status/mutations'
import { toast } from 'react-toastify'
import { GET_BOARDS } from '@src/graphQL/boards/queries'

const useCreateStatus = () => {
    const [createStatus, { loading: isStatusCreating }] = useMutation(
        CREATE_STATUS,
        {
            onCompleted: () => {
                toast.success('Status has been created')
            },
            onError: () => {
                toast.error('Status creation failed')
            },
        }
    )

    const addStatus = (statusName: string, boardId: string) => {
        createStatus({
            variables: {
                statusName: statusName,
                boardId: boardId,
            },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    return { addStatus, isStatusCreating }
}

export default useCreateStatus
