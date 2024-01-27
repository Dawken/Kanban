import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_BOARD } from '@src/graphQL/boards/queries'
import { useEffect, useState } from 'react'
import { StatusProps } from '@src/types/status/statusProps'

const useBoard = () => {
    const params = useParams()

    const { data, loading } = useQuery(GET_BOARD, {
        variables: { boardId: params.id },
    })

    const [statuses, setStatuses] = useState<StatusProps[]>(
        data?.board.status ?? []
    )

    useEffect(() => {
        if (data) {
            setStatuses(data.board.status)
        }
    }, [data])

    return {
        data,
        loading,
        statuses,
        setStatuses,
    }
}
export default useBoard
