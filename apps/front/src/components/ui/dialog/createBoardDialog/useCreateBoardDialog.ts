import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import { GET_BOARDS } from '@src/graphQL/boards/queries'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import boardSchema, { BoardInput } from '@src/schemas/boardSchema'

const useCreateBoardDialog = (handleClose: () => void) => {
    const router = useRouter()

    const methods = useForm<BoardInput>({
        defaultValues: {
            boardName: 'New Board',
            status: [
                { value: 'To do' },
                { value: 'During' },
                { value: 'Done' },
            ],
        },
        resolver: zodResolver(boardSchema),
    })

    const [createBoard, { loading }] = useMutation(CREATE_BOARD, {
        onCompleted: (data) => {
            toast.success('New board added')
            router.push(`/boards/${data.createBoard.id}`)
        },
        onError: () => {
            toast.error('Board creation failed')
        },
    })

    const transformBoardData = (data: BoardInput) => {
        return {
            ...data,
            status: data.status.map(
                (status: { value: string }) => status.value
            ),
        }
    }

    const addBoard = () => {
        return methods.handleSubmit((data) => {
            const boardData = transformBoardData(data)

            createBoard({
                variables: boardData,
                refetchQueries: [{ query: GET_BOARDS }],
            }).then(() => handleClose())
        })
    }

    return {
        methods,
        loading,
        addBoard,
    }
}
export default useCreateBoardDialog
