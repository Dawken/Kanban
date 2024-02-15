import { useMutation, useQuery } from '@apollo/client'
import { GET_BOARDS } from '@src/graphQL/boards/queries'
import { useEffect, useState } from 'react'
import { BoardProps } from '@src/types/board/boardProps'
import { UPDATE_BOARDS_ORDER } from '@src/graphQL/boards/mutations'

const useBoards = () => {
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

    return {
        loading,
        boards,
        setBoards,
    }
}

export default useBoards
