import { useParams } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { PUSH_TASK } from '@src/graphQL/tasks/mutations'
import { GET_BOARD_TASKS } from '@src/graphQL/tasks/queries'
import { DragStartEvent, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'
import { deepEqual } from 'fast-equals'

const useStatuses = () => {
    const params = useParams()

    const [pushTask] = useMutation(PUSH_TASK)
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

    const [draggedItem, setDraggedItem] = useState()

    useDndMonitor({
        onDragStart(event: DragStartEvent) {
            setDraggedItem(event.active?.data.current?.item)
        },
        onDragEnd(event) {
            const task = event.active?.data.current?.item

            if (task && !deepEqual(draggedItem, task)) {
                const { id, statusId, order } = task
                pushTaskToStatus(id, statusId, order)
            }
        },
    })
}
export default useStatuses
