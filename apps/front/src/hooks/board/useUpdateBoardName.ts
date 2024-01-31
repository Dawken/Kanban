import { useMutation } from '@apollo/client'
import { UPDATE_BOARD_NAME } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'

const useUpdateBoardName = () => {
    const [updateBoardName, { loading: isBoardNameUpdating }] = useMutation(
        UPDATE_BOARD_NAME,
        {
            onCompleted: () => {
                toast.success('Board name updated')
            },
            onError: () => {
                toast.error('Board name update failed')
            },
        }
    )

    const editBoardName = (boardName: string, boardId: string) => {
        if (boardName.length < 1) {
            return toast.error('Board name cannot be empty')
        } else {
            updateBoardName({
                variables: {
                    boardName: boardName,
                    boardId: boardId,
                },
            })
        }
    }

    return { isBoardNameUpdating, editBoardName }
}
export default useUpdateBoardName
