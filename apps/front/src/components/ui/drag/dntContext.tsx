import React, { ReactNode } from 'react'
import {
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
}
const DntContext = ({
    children,
    handleOnDragEnd,
    onDragStart,
    onDragCancel,
    onDragOver,
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
            collisionDetection={pointerWithin}
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
