import { Dispatch, SetStateAction, useState } from 'react'
import {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core'
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

        const updateTasksOrder = (
            sortedArray: TaskProps[],
            statusId: string | UniqueIdentifier
        ) => {
            const filteredTasksMap = new Map()
            sortedArray
                .filter((task) => task.statusId === statusId)
                .forEach((task, index) => {
                    const updatedTask = { ...task, order: index + 1 }
                    filteredTasksMap.set(task.id, updatedTask)
                })

            return sortedArray.map((item) => {
                return filteredTasksMap.get(item.id) ?? item
            })
        }

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
                    prevTasks[oldIndex].statusId !==
                    prevTasks[newIndex].statusId
                ) {
                    const updatedTask = {
                        ...prevTasks[oldIndex],
                        statusId: updatedTasks[newIndex].statusId,
                        order:
                            active.data.current?.item.order ??
                            updatedTasks[newIndex].order,
                    }

                    updatedTasks[oldIndex] = updatedTask

                    return arrayMove(
                        updatedTasks,
                        oldIndex,
                        oldIndex < newIndex ? newIndex - 1 : newIndex
                    )
                } else {
                    const { statusId } = updatedTasks[newIndex]

                    const sortedArray = arrayMove(
                        updatedTasks,
                        oldIndex,
                        newIndex
                    )

                    return updateTasksOrder(sortedArray, statusId)
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

                const statusId = over.id

                updatedTasks[activeIndex] = updatedTask

                const newIndex =
                    over?.id === active?.data.current?.item.statusId
                        ? activeIndex
                        : updatedTasks.length

                const sortedArray = arrayMove(
                    updatedTasks,
                    activeIndex,
                    newIndex
                )

                return updateTasksOrder(sortedArray, statusId)
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
