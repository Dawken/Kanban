import { useParams } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { PUSH_TASK } from '@src/graphQL/tasks/mutations'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { DragStartEvent, useDndMonitor } from '@dnd-kit/core'
import { RefObject, useState } from 'react'
import { deepEqual } from 'fast-equals'
import { UPDATE_STATUS_ORDER } from '@src/graphQL/status/mutations'
import { GET_BOARD } from '@src/graphQL/boards/queries'
import { BoardProps } from '@src/types/board/boardProps'

const useStatuses = (scrollableRef: RefObject<HTMLDivElement>) => {
    const params = useParams()

    const [pushTask] = useMutation(PUSH_TASK)

    const [updateStatusOrder, { loading: isStatusOrderUpdating }] =
        useMutation(UPDATE_STATUS_ORDER)
    const pushTaskToStatus = (id: string, statusId: string, order: number) => {
        pushTask({
            variables: {
                taskId: id,
                newStatusId: statusId,
                order,
            },
            refetchQueries: [
                {
                    query: GET_BOARD_TASKS,
                    variables: {
                        boardId: params.id,
                    },
                },
            ],
        })
    }

    const updateStatusesOrder = (statusId: string, order: number) => {
        updateStatusOrder({
            variables: {
                statusId,
                order,
            },
            update: (cache, { data }) => {
                const { board } = cache.readQuery<{ board: BoardProps }>({
                    query: GET_BOARD,
                    variables: { boardId: params.id },
                }) || { board: {} }

                if (!board) return

                cache.writeQuery({
                    query: GET_BOARD,
                    variables: { boardId: params.id },
                    data: {
                        board: {
                            ...board,
                            status: data.updateStatusOrder,
                        },
                    },
                })
            },
        })
    }

    const [draggedTask, setDraggedTask] = useState()

    const scrollToTop = () => {
        scrollableRef.current?.scrollTo({ top: 0 })
    }

    useDndMonitor({
        onDragStart(event: DragStartEvent) {
            setDraggedTask(event.active?.data.current?.item)
            if (event.active.data.current?.status) {
                scrollToTop()
            }
        },
        onDragEnd(event) {
            // Change task order
            const task = event.active?.data.current?.item

            if (task && !deepEqual(draggedTask, task)) {
                const { id, statusId, order } = task
                pushTaskToStatus(id, statusId, order)
            }

            // Change status order
            const draggedStatus = event.active.data.current?.status
            const overStatus = event.over?.data.current?.status

            if (
                draggedStatus &&
                overStatus &&
                !deepEqual(draggedStatus, overStatus)
            ) {
                updateStatusesOrder(draggedStatus.id, overStatus.order)
            }
        },
    })
    return {
        isStatusOrderUpdating,
    }
}
export default useStatuses
