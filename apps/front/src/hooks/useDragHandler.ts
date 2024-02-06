import { Dispatch, SetStateAction, useState } from 'react'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { DragIdProps } from '@src/types/dragIdProps'
import { StatusProps } from '@src/types/status/statusProps'
import { BoardProps } from '@src/types/board/boardProps'
import { TaskProps } from '@src/types/task/taskProps'
import { arrayMove } from '@dnd-kit/sortable'
import { SetItemsAction } from '@src/types/setItemsProps'

const useDragHandler = (items: StatusProps[] | BoardProps[] | TaskProps[]) => {
    const [dragId, setDragId] = useState<DragIdProps>(null)

    const [draggedTask, setDraggedTask] = useState<TaskProps | null>(null)

    const onDragStart = (event: DragStartEvent) => {
        setDragId(event.active.id)

        if (event.active.data.current?.type === 'Task') {
            setDraggedTask(event.active.data.current.item)
        }
    }
    const onDragCancel = () => setDragId(null)

    const handleOnDragEnd = <T extends { id: string; order: number }>(
        event: DragEndEvent,
        setItems: SetItemsAction<T>
    ) => {
        setDraggedTask(null)

        const { active, over } = event

        if (over && active.id === over.id) return
        setItems((prevState) => {
            const oldIndex = prevState.findIndex(
                (item) => item.id === active.id
            )
            const newIndex = prevState.findIndex((item) => item.id === over?.id)
            const sortedArray = arrayMove(prevState, oldIndex, newIndex)

            return sortedArray.map((item, index) => {
                return {
                    ...item,
                    order: index + 1,
                }
            })
        })
    }

    // Finding existing dragged object based on its id
    const draggedItem =
        dragId !== null ? items.find((item) => item.id === dragId) : null

    const onDragOver = (
        event: DragOverEvent,
        setTasks: Dispatch<SetStateAction<TaskProps[]>>
    ) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveATask = active.data.current?.type === 'Task'
        const isOverATask = over.data.current?.type === 'Task'

        if (!isActiveATask) return

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks]
                const activeIndex = updatedTasks.findIndex(
                    (task) => task.id === activeId
                )
                const overIndex = updatedTasks.findIndex(
                    (task) => task.id === overId
                )

                if (
                    updatedTasks[activeIndex].statusId !==
                    updatedTasks[overIndex].statusId
                ) {
                    const updatedTask = {
                        ...updatedTasks[activeIndex],
                        statusId: updatedTasks[overIndex].statusId,
                        order: overIndex,
                    }

                    updatedTasks[activeIndex] = updatedTask

                    return arrayMove(
                        updatedTasks,
                        activeIndex,
                        Math.max(overIndex - 1, 0)
                    )
                }

                return arrayMove(updatedTasks, activeIndex, overIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === 'Status'

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((prevTasks) => {
                const activeIndex = prevTasks.findIndex(
                    (task) => task.id === activeId
                )

                const updatedTask = {
                    ...prevTasks[activeIndex],
                    statusId: String(overId),
                }

                const updatedTasks = [...prevTasks]
                updatedTasks[activeIndex] = updatedTask

                return updatedTasks
            })
        }
    }

    return {
        dragId,
        onDragStart,
        onDragCancel,
        handleOnDragEnd,
        onDragOver,
        draggedItem,
        draggedTask,
    }
}
export default useDragHandler
