import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import { UPDATE_STATUS_ORDER } from '@src/graphQL/status/mutations'
import { GET_BOARD, GET_BOARDS } from '@src/graphQL/boards/queries'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'

const useBoard = () => {
    const params = useParams()

    const { data, loading } = useQuery(GET_BOARD, {
        variables: { boardId: params.id },
    })

    const { data: tasksArray } = useQuery(GET_BOARD_TASKS, {
        variables: { boardId: params.id },
    })

    const [tasks, setTasks] = useState<TaskProps[]>(tasksArray?.tasks ?? [])

    const [updateStatusOrder] = useMutation(UPDATE_STATUS_ORDER)

    const [statuses, setStatuses] = useState<StatusProps[]>(
        data?.board.status ?? []
    )

    useEffect(() => {
        if (data) {
            setStatuses(data.board.status)
        }
        if (tasksArray) {
            setTasks(tasksArray.tasks)
        }
    }, [data, tasksArray])

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

    return {
        data,
        loading,
        statuses,
        setStatuses,
        tasks,
        setTasks,
        statusesId,
    }
}
export default useBoard
