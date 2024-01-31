import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import { GET_BOARD, GET_BOARDS } from '@src/graphQL/boards/queries'
import { useEffect, useState } from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import { UPDATE_STATUS_ORDER } from '@src/graphQL/status/mutations'

const useBoard = () => {
    const params = useParams()

    const { data, loading } = useQuery(GET_BOARD, {
        variables: { boardId: params.id },
    })

    const [updateStatusOrder] = useMutation(UPDATE_STATUS_ORDER)

    const [statuses, setStatuses] = useState<StatusProps[]>(
        data?.board.status ?? []
    )

    useEffect(() => {
        if (data) {
            setStatuses(data.board.status)
        }
    }, [data])

    const updateBoards = () => {
        updateStatusOrder({
            variables: { newStatusOrder: statuses },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    useEffect(() => {
        if (
            data &&
            JSON.stringify(data.board.status) !== JSON.stringify(statuses)
        ) {
            updateBoards()
        }
    }, [statuses])

    return {
        data,
        loading,
        statuses,
        setStatuses,
    }
}
export default useBoard
