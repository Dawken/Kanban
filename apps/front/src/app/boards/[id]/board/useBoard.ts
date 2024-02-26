import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import { DragIdProps } from '@src/types/dragIdProps'
import { GET_BOARD } from '@src/graphQL/boards/queries'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'

const useBoard = (dragId: DragIdProps) => {
    const params = useParams()

    const paramsId = params.id

    const scrollableRef = useRef<HTMLDivElement>(null)

    const { data, loading } = useQuery(GET_BOARD, {
        variables: { boardId: paramsId },
    })

    const { data: boardTasks } = useQuery(GET_BOARD_TASKS, {
        variables: { boardId: paramsId },
    })

    const [tasks, setTasks] = useState<TaskProps[]>(boardTasks?.tasks ?? [])

    const [statuses, setStatuses] = useState<StatusProps[]>(
        data?.board.status ?? []
    )

    useEffect(() => {
        if (data) setStatuses(data.board.status)

        if (boardTasks) setTasks(boardTasks.tasks)
    }, [data, boardTasks])

    const statusesId = useMemo(
        () => statuses.map((status) => status.id),
        [statuses]
    )

    const draggedStatus =
        dragId !== null ? statuses.find((item) => item.id === dragId) : null

    return {
        data,
        scrollableRef,
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
