import { useMutation, useQuery } from '@apollo/client'
import GET_BOARDS from '@src/graphQL/boards/queries'
import { useEffect, useState } from 'react'
import { BoardProps } from '@src/types/boardProps'
import { DragIdProps } from '@src/types/dragIdProps'
import { UPDATE_BOARDS_ORDER } from '@src/graphQL/boards/mutations'

const useBoards = (dragId: DragIdProps) => {
    const { data, loading } = useQuery(GET_BOARDS)
    const [updateBoardOrder] = useMutation(UPDATE_BOARDS_ORDER)

    const [boards, setBoards] = useState<BoardProps[]>(data?.boards ?? [])

    useEffect(() => {
        if (data) {
            setBoards(data.boards)
        }
    }, [data])

    const updateBoards = () => {
        updateBoardOrder({
            variables: { newBoardOrder: boards },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    useEffect(() => {
        if (data && JSON.stringify(data.boards) !== JSON.stringify(boards)) {
            updateBoards()
        }
    }, [boards])

    // Finding existing board object based on its id
    const draggedBoard =
        dragId !== null ? boards.find((board) => board.id === dragId) : null

    return {
        loading,
        boards,
        setBoards,
        draggedBoard,
    }
}

export default useBoards
