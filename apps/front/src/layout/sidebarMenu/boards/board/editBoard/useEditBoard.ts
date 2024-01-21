import { useMutation } from '@apollo/client'
import { UPDATE_BOARD_NAME } from '@src/graphQL/boards/mutations'
import { toast } from 'react-toastify'
import { BoardProps } from '@src/types/boardProps'
import { useState } from 'react'

const useEditBoard = ({ board }: { board: BoardProps }) => {
    const [boardName, setBoardName] = useState(board.boardName)

    const [updateBoardName, { loading }] = useMutation(UPDATE_BOARD_NAME, {
        onCompleted: () => {
            toast.success('Board name updated')
        },
        onError: () => {
            toast.error('Board name update failed')
        },
    })

    const handleChange = (value: string) => {
        setBoardName(value)
    }
    const editBoardName = () => {
        if (boardName.length < 1) {
            return toast.error('Board name cannot be empty')
        } else {
            updateBoardName({
                variables: {
                    boardName: boardName,
                    boardId: board.id,
                },
            })
        }
    }

    return {
        loading,
        editBoardName,
        boardName,
        handleChange,
    }
}

export default useEditBoard
