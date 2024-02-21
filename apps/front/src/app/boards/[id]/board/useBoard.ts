import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import { DragIdProps } from '@src/types/dragIdProps'
import { UPDATE_STATUS_ORDER } from '@src/graphQL/status/mutations'
import { GET_BOARD, GET_BOARDS } from '@src/graphQL/boards/queries'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'

const useBoard = (dragId: DragIdProps) => {
    const params = useParams()

    const paramsId = params.id

    const [updateStatusOrder] = useMutation(UPDATE_STATUS_ORDER)

    const { data, loading } = useQuery(GET_BOARD, {
        variables: { boardId: paramsId },
    })

    const { data: prevTasks } = useQuery(GET_BOARD_TASKS, {
        variables: { boardId: paramsId },
    })

    const [tasks, setTasks] = useState<TaskProps[]>(prevTasks?.tasks ?? [])

    const [statuses, setStatuses] = useState<StatusProps[]>(
        data?.board.status ?? []
    )

    useEffect(() => {
        if (data && prevTasks) {
            setStatuses(data.board.status)
            setTasks(prevTasks.tasks)
        }
    }, [data, prevTasks])

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

    const statusesId = useMemo(
        () => statuses.map((status) => status.id),
        [statuses]
    )

    const draggedStatus =
        dragId !== null ? statuses.find((item) => item.id === dragId) : null

    return {
        data,
        loading,
        statuses,
        setStatuses,
        tasks,
        setTasks,
        statusesId,
        draggedStatus,
    }
}
export default useBoard
