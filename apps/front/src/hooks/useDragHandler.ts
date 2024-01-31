import { useState } from 'react'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { DragIdProps } from '@src/types/dragIdProps'
import { StatusProps } from '@src/types/status/statusProps'
import { BoardProps } from '@src/types/board/boardProps'
import { arrayMove } from '@dnd-kit/sortable'
import { SetItemsAction } from '@src/types/setItemsProps'

const useDragHandler = (items: StatusProps[] | BoardProps[]) => {
    const [dragId, setDragId] = useState<DragIdProps>(null)

    const onDragStart = (event: DragStartEvent) => {
        setDragId(event.active.id)
    }
    const onDragCancel = () => setDragId(null)

    const handleOnDragEnd = <T extends { id: string; order: number }>(
        event: DragEndEvent,
        setItems: SetItemsAction<T>
    ) => {
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

    return { dragId, onDragStart, onDragCancel, handleOnDragEnd, draggedItem }
}
export default useDragHandler
