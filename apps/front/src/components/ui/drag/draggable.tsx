import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type DraggableProps = {
    children: ReactNode
    id: string
}
const Draggable = ({ children, id }: DraggableProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
        isDragging,
    } = useSortable({ id: id })

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
