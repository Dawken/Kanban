import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import GET_BOARDS from '@src/graphQL/boards/queries'
import { BoardCredentialsProps } from '@src/types/boardCredentialsProps'

const useAddBoard = () => {
    const methods = useForm<BoardCredentialsProps>({
        defaultValues: {
            boardName: 'New Board',
            status: [
                { value: 'To do' },
                { value: 'During' },
                { value: 'Done' },
            ],
        },
    })

    const [createBoard, { loading, error }] = useMutation(CREATE_BOARD, {
        onCompleted: () => {
            toast.success('New board added')
        },
        onError: () => {
            toast.error('Board creation failed')
        },
    })

    const transformBoardData = (data: BoardCredentialsProps) => {
        return {
            ...data,
            status: data.status.map((status) => status.value),
        }
    }

    const addBoard = () => {
        return methods.handleSubmit((data) => {
            const boardData = transformBoardData(data)
            createBoard({
                variables: boardData,
                refetchQueries: [{ query: GET_BOARDS }],
            })
        })
    }

    return {
        methods,
        loading,
        error,
        addBoard,
    }
}
export default useAddBoard
