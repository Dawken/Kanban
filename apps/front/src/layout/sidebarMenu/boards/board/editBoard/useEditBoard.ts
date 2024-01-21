import { BoardProps } from '@src/types/boardProps'
import { useState } from 'react'

const useEditBoard = ({ board }: { board: BoardProps }) => {
    const [boardName, setBoardName] = useState(board.boardName)

    const handleChange = (value: string) => {
        setBoardName(value)
    }

    return {
        boardName,
        handleChange,
    }
}

export default useEditBoard
