import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BoardProps } from '@src/types/board/boardProps'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'

type DraggableProps = {
    children: ReactNode
    id: string
    disabled?: boolean
    data?: {
        type: string
        item: BoardProps | StatusProps | TaskProps
    }
}
const Draggable = ({ children, id, disabled, data }: DraggableProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
        isDragging,
    } = useSortable({
        id,
        disabled,
        data,
    })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={
                isDragging
                    ? 'invisible'
                    : `visible touch-none ${
                          disabled ? 'cursor-default' : 'cursor-grab'
                      }`
            }
        >
            {children}
        </div>
    )
}

export default Draggable
