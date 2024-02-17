import { Dispatch, SetStateAction, useState } from 'react'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { DragIdProps } from '@src/types/dragIdProps'
import { StatusProps } from '@src/types/status/statusProps'
import { BoardProps } from '@src/types/board/boardProps'
import { TaskProps } from '@src/types/task/taskProps'
import { arrayMove } from '@dnd-kit/sortable'
import { SetItemsAction } from '@src/types/setItemsProps'

const useDragHandler = (items?: StatusProps[] | BoardProps[] | TaskProps[]) => {
    const [dragId, setDragId] = useState<DragIdProps>(null)

    const [draggedTask, setDraggedTask] = useState<TaskProps | null>(null)

    const [isDraggingTask, setIsDraggingTask] = useState(false)

    const onDragStart = (event: DragStartEvent) => {
        setDragId(event.active.id)

        if (event.active.data.current?.type === 'Task') {
            setIsDraggingTask(true)
            setDraggedTask(event.active.data.current.item)
        }
    }
    const onDragCancel = () => {
        setDragId(null)
        setIsDraggingTask(false)
    }

    const handleOnDragEnd = <T extends { id: string; order: number }>(
        event: DragEndEvent,
        setItems: SetItemsAction<T>
    ) => {
        setDraggedTask(null)
        setIsDraggingTask(false)

        const { active, over } = event

        if (over && active.id === over.id) return

        if (active.data.current?.type === 'Task') return

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
        dragId !== null ? items?.find((item) => item.id === dragId) : null

    const onDragOver = (
        event: DragOverEvent,
        setTasks: Dispatch<SetStateAction<TaskProps[]>>
    ) => {
        const { active, over } = event

        if (!over) return

        if (active.id === over.id) return

        const isActiveATask = active.data.current?.type === 'Task'
        const isOverATask = over.data.current?.type === 'Task'
        const isOverAColumn = over.data.current?.type === 'Status'

        if (!isActiveATask) return

        // Im dropping a Task over another Task
        if (isOverATask) {
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks]

                const oldIndex = prevTasks.findIndex(
                    (item) => item.id === active.id
                )
                const newIndex = prevTasks.findIndex(
                    (item) => item.id === over?.id
                )

                if (
                    updatedTasks[oldIndex].statusId !==
                    updatedTasks[newIndex].statusId
                ) {
                    const updatedTask = {
                        ...updatedTasks[oldIndex],
                        statusId: updatedTasks[newIndex].statusId,
                    }

                    updatedTasks[oldIndex] = updatedTask

                    return arrayMove(
                        updatedTasks,
                        oldIndex,
                        Math.max(newIndex - 1, 0)
                    )
                } else {
                    const { statusId } = updatedTasks[newIndex]

                    const sortedArray = arrayMove(
                        updatedTasks,
                        oldIndex,
                        newIndex
                    )

                    const filteredTasks = sortedArray
                        .filter((task) => task.statusId === statusId)
                        .map((item, index) => ({
                            ...item,
                            order: index + 1,
                        }))

                    return sortedArray.map((item) => {
                        if (item.statusId === statusId) {
                            const updatedTask = filteredTasks.find(
                                (task) => task.id === item.id
                            )
                            return updatedTask ?? item
                        }
                        return item
                    })
                }
            })
        }

        // Im dropping a Task over a column
        if (isOverAColumn) {
            setTasks((prevTasks) => {
                const activeIndex = prevTasks.findIndex(
                    (task) => task.id === active.id
                )

                const updatedTasks = [...prevTasks]

                const updatedTask = {
                    ...prevTasks[activeIndex],
                    statusId: String(over.id),
                }

                updatedTasks[activeIndex] = updatedTask

                return arrayMove(
                    updatedTasks,
                    activeIndex,
                    over.id !== active.data.current?.item.statusId
                        ? 0
                        : activeIndex
                )
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
        isDraggingTask,
    }
}
export default useDragHandler
