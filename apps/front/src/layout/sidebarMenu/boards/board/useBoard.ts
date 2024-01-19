import { useForm } from 'react-hook-form'
import { BoardCredentialsProps } from '@src/types/boardCredentialsProps'
import { StatusProps } from '@src/types/statusProps'
import { useMutation } from '@apollo/client'
import { EDIT_BOARD } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import { BoardProps } from '@src/types/boardProps'

const useBoard = ({ board }: { board: BoardProps }) => {
    const methods = useForm<BoardCredentialsProps>({
        defaultValues: {
            boardName: board.boardName,
            status: board.status.map((status: StatusProps) => ({
                value: status.statusName,
            })),
        },
    })

    const [editBoard, { loading, error }] = useMutation(EDIT_BOARD, {
        onCompleted: () => {
            toast.success('Board updated')
        },
        onError: () => {
            toast.error('Board update failed')
        },
    })

    const updateBoard = () => {
        return methods.handleSubmit((boardData) => {
            editBoard({
                variables: {
                    ...boardData,
                    boardId: board.id,
                },
            })
        })
    }

    return {
        methods,
        loading,
        error,
        updateBoard,
    }
}

export default useBoard
