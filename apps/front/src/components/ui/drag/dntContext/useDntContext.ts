import {
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { SetItemsAction } from '@src/types/setItemsProps'

const useDntContext = (setItems: SetItemsAction) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    const handleOnDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over) {
            if (active.id === over.id) return
            setItems((prevState) => {
                const oldIndex = prevState.findIndex(
                    (item) => item.id === active.id
                )
                const newIndex = prevState.findIndex(
                    (item) => item.id === over.id
                )
                const sortedArray = arrayMove(prevState, oldIndex, newIndex)

                return sortedArray.map((item, index) => {
                    return {
                        ...item,
                        order: index + 1,
                    }
                })
            })
        }
    }

    return {
        sensors,
        handleOnDragEnd,
    }
}

export default useDntContext
