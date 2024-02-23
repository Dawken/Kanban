import React, { ReactNode } from 'react'
import {
    rectIntersection,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    pointerWithin,
    useSensor,
    useSensors,
} from '@dnd-kit/core'

type DntContextProps = {
    children: ReactNode
    handleOnDragEnd: (event: DragEndEvent) => void
    onDragStart: (event: DragStartEvent) => void
    onDragCancel: () => void
    onDragOver?: (event: DragOverEvent) => void
    isDraggingTask?: boolean
}
const DntContext = ({
    children,
    handleOnDragEnd,
    onDragStart,
    onDragCancel,
    onDragOver,
    isDraggingTask,
}: DntContextProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={
                isDraggingTask ? pointerWithin : rectIntersection
            }
            onDragStart={onDragStart}
            onDragCancel={onDragCancel}
            onDragEnd={handleOnDragEnd}
            onDragOver={onDragOver}
        >
            {children}
        </DndContext>
    )
}

export default DntContext
