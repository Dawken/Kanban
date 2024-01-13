import React, { ReactNode } from 'react'
import { closestCenter, DndContext, DragStartEvent } from '@dnd-kit/core'
import useDntContext from '@src/components/ui/drag/dntContext/useDntContext'
import { SetItemsAction } from '@src/types/setItemsProps'

type DntContextProps = {
    children: ReactNode
    setItems: SetItemsAction
    onDragStart: (event: DragStartEvent) => void
    onDragCancel: () => void
}
const DntContext = ({
    children,
    setItems,
    onDragStart,
    onDragCancel,
}: DntContextProps) => {
    const { sensors, handleOnDragEnd } = useDntContext(setItems)

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
