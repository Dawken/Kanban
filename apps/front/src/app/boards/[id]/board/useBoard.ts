import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import { DragIdProps } from '@src/types/dragIdProps'
import { UPDATE_STATUS_ORDER } from '@src/graphQL/status/mutations'
import { GET_BOARD, GET_BOARDS } from '@src/graphQL/boards/queries'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { PUSH_TASK, UPDATE_TASK_ORDER } from '@src/graphQL/tasks/mutations'

const useBoard = (dragId: DragIdProps, isDraggingTask: boolean) => {
    const params = useParams()

    const paramsId = params.id

    const [updateStatusOrder] = useMutation(UPDATE_STATUS_ORDER)
    const [pushTask] = useMutation(PUSH_TASK)
    const [updateTaskOrder] = useMutation(UPDATE_TASK_ORDER)

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

    if (data && statuses.length === 0) {
        setStatuses(data.board.status)
    }

    if (prevTasks && tasks.length === 0) {
        setTasks(prevTasks.tasks)
    }

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

    const pushTaskToStatus = (
        id: string,
        statusId: string,
        updatedTaskIndex: number
    ) => {
        pushTask({
            variables: {
                taskId: id,
                newStatusId: statusId,
                order: updatedTaskIndex + 1,
            },
            refetchQueries: [
                {
                    query: GET_BOARD_TASKS,
                    variables: {
                        boardId: paramsId,
                    },
                },
            ],
        })
    }
    const updateTasksOrder = (statusOrder: TaskProps[]) => {
        updateTaskOrder({
            variables: {
                newTaskOrder: statusOrder,
            },
            refetchQueries: [
                {
                    query: GET_BOARD_TASKS,
                    variables: {
                        boardId: paramsId,
                    },
                },
            ],
        })
    }

    useEffect(() => {
        const updatedTask = tasks?.find((task) => task.id === dragId)

        const prevTask = prevTasks?.tasks.find(
            (task: TaskProps) => task.id === dragId
        )

        if (!prevTask || !updatedTask || isDraggingTask) return

        if (JSON.stringify(prevTask) !== JSON.stringify(updatedTask)) {
            if (updatedTask.statusId !== prevTask.statusId) {
                const updatedTaskIndex = tasks
                    .filter((task) => task.statusId === updatedTask.statusId)
                    .findIndex((task) => task.id === updatedTask.id)

                const { id, statusId } = updatedTask

                pushTaskToStatus(id, statusId, updatedTaskIndex)
            } else if (updatedTask.statusId === prevTask.statusId) {
                const statusOrder = tasks.filter(
                    (task) => task.statusId === updatedTask?.statusId
                )
                updateTasksOrder(statusOrder)
            }
        }
    }, [tasks, isDraggingTask])

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
