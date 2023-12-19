import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import { BoardType } from '@src/types/boardType'
import GET_BOARDS from '@src/graphQL/boards/queries'

type BoardCredentials = {
    boardName: string
    status: { value: string }[]
}
const useAddBoard = () => {
    const methods = useForm<BoardCredentials>({
        defaultValues: {
            boardName: 'New Board',
            status: [
                { value: 'To do' },
                { value: 'During' },
                { value: 'Done' },
            ],
        },
    })

    const { register, control } = methods

    const defaultValues = methods.getValues()

    const { remove, append } = useFieldArray({
        control,
        name: 'status',
    })

    const [createBoard, { loading, error }] = useMutation(CREATE_BOARD, {
        onCompleted: () => {
            toast.success('New board added')
        },
        onError: () => {
            toast.error('Board creation failed')
        },
    })

    const transformBoardData = (data: BoardCredentials) => {
        return {
            ...data,
            status: data.status.map((status) => status.value),
        }
    }

    const addBoard = (boardData: BoardType) => {
        createBoard({
            variables: boardData,
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    return {
        methods,
        register,
        defaultValues,
        remove,
        append,
        loading,
        error,
        transformBoardData,
        addBoard,
    }
}
export default useAddBoard
