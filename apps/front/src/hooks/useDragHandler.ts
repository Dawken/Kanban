import { useState } from 'react'
import { DragStartEvent } from '@dnd-kit/core'
import { DragIdProps } from '@src/types/dragIdProps'

const useDragHandler = () => {
    const [dragId, setDragId] = useState<DragIdProps>(null)

    const onDragStart = (event: DragStartEvent) => {
        setDragId(event.active.id)
    }
    const onDragCancel = () => setDragId(null)

    return { dragId, onDragStart, onDragCancel }
}
export default useDragHandler
