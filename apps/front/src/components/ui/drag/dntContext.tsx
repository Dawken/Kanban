import React, { ReactNode } from 'react'
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'

type DntContextProps = {
    children: ReactNode
    handleOnDragEnd: (event: DragEndEvent) => void
    onDragStart: (event: DragStartEvent) => void
    onDragCancel: () => void
}
const DntContext = ({
    children,
    handleOnDragEnd,
    onDragStart,
    onDragCancel,
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
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragCancel={onDragCancel}
            onDragEnd={handleOnDragEnd}
        >
            {children}
        </DndContext>
    )
}

export default DntContext
