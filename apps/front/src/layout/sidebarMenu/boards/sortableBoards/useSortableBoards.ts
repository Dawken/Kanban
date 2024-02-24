import { useDndMonitor } from '@dnd-kit/core'
import { useMutation } from '@apollo/client'
import { UPDATE_BOARDS_ORDER } from '@src/graphQL/boards/mutations'
import { GET_BOARDS } from '@src/graphQL/boards/queries'
import { deepEqual } from 'fast-equals'

const useSortableBoards = () => {
    const [updateBoardOrder] = useMutation(UPDATE_BOARDS_ORDER)

    const updateBoards = (boardId: string, order: number) => {
        updateBoardOrder({
            variables: {
                boardId,
                order,
            },
            refetchQueries: [{ query: GET_BOARDS }],
        })
    }

    useDndMonitor({
        onDragEnd(event) {
            const draggedBoard = event.active.data.current?.item
            const overBoard = event.over?.data.current?.item

            if (
                draggedBoard &&
                overBoard &&
                !deepEqual(draggedBoard, overBoard)
            ) {
                updateBoards(draggedBoard.id, overBoard.order)
            }
        },
    })
}
export default useSortableBoards
