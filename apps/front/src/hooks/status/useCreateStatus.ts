import { useMutation } from '@apollo/client'
import { CREATE_STATUS } from '@src/graphQL/status/mutations'
import { toast } from 'react-toastify'
import { GET_BOARD } from '@src/graphQL/boards/queries'
import { useParams } from 'next/navigation'
import useTextState from '@src/hooks/useTextState'
import { BoardProps } from '@src/types/board/boardProps'

const useCreateStatus = () => {
    const params = useParams()
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
    const { text: newStatusName, handleChange } = useTextState()
    const addStatus = (statusName: string, boardId: string) => {
        handleChange(statusName)
        createStatus({
            variables: {
                statusName: statusName,
                boardId: boardId,
            },
            update: (cache, { data }) => {
                const { board } = cache.readQuery<{ board: BoardProps }>({
                    query: GET_BOARD,
                    variables: { boardId: params.id },
                }) || { board: undefined }

                if (!board) return

                cache.writeQuery({
                    query: GET_BOARD,
                    variables: { boardId: params.id },
                    data: {
                        board: {
                            ...board,
                            status: [...board.status, data.createStatus],
                        },
                    },
                })
            },
        })
    }

    return { addStatus, isStatusCreating, newStatusName }
}

export default useCreateStatus
