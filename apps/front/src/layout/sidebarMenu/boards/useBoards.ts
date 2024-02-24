import { useQuery } from '@apollo/client'
import { GET_BOARDS } from '@src/graphQL/boards/queries'
import { useEffect, useMemo, useState } from 'react'
import { BoardProps } from '@src/types/board/boardProps'

const useBoards = () => {
    const { data, loading } = useQuery(GET_BOARDS)

    const [boards, setBoards] = useState<BoardProps[]>(data?.boards ?? [])

    useEffect(() => {
        if (data) {
            setBoards(data.boards)
        }
    }, [data])

    const boardsId = useMemo(() => boards.map((status) => status.id), [boards])

    return {
        loading,
        boards,
        setBoards,
        boardsId,
    }
}

export default useBoards
