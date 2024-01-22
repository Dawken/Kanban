import { useMutation } from '@apollo/client'
import { DELETE_BOARD } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import { GET_BOARDS } from '@src/graphQL/boards/queries'

const useDeleteBoard = (boardId: string) => {
    const [deleteBoard, { loading: isBoardRemoving }] = useMutation(
        DELETE_BOARD,
        {
            onCompleted: () => {
                toast.success('Board has been deleted')
            },
            onError: () => {
                toast.error('Board delete failed')
            },
        }
    )
    const removeBoard = () => {
        deleteBoard({
            variables: {
                boardId: boardId,
            },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    return {
        removeBoard,
        isBoardRemoving,
    }
}

export default useDeleteBoard
