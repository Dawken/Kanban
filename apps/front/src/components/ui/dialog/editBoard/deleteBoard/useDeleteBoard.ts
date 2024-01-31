import { useMutation } from '@apollo/client'
import { DELETE_BOARD } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import { GET_BOARDS } from '@src/graphQL/boards/queries'
import { useParams, useRouter } from 'next/navigation'

const useDeleteBoard = (boardId: string) => {
    const params = useParams()

    const router = useRouter()

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
        }).then(() => {
            if (params.id === boardId) {
                router.push('/')
            }
        })
    }

    return {
        removeBoard,
        isBoardRemoving,
    }
}

export default useDeleteBoard
