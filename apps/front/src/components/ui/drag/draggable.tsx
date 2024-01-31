import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type DraggableProps = {
    children: ReactNode
    id: string
    disabled?: boolean
}
const Draggable = ({ children, id, disabled }: DraggableProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
        isDragging,
    } = useSortable({ id: id, disabled: disabled })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={
                isDragging ? 'invisible' : 'visible touch-none cursor-grab'
            }
        >
            {children}
        </div>
    )
}

export default Draggable
