import { useDndMonitor } from '@dnd-kit/core'
import { useMutation } from '@apollo/client'
import { UPDATE_BOARDS_ORDER } from '@src/graphQL/boards/mutations'
import { deepEqual } from 'fast-equals'
import { useParams } from 'next/navigation'
import { GET_BOARDS } from '@src/graphQL/boards/queries'

const useSortableBoards = () => {
    const params = useParams()
    const [updateBoardOrder, { loading: isBoardOrderUpdating }] =
        useMutation(UPDATE_BOARDS_ORDER)

    const updateBoards = (boardId: string, order: number) => {
        updateBoardOrder({
            variables: {
                boardId,
                order,
            },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: GET_BOARDS,
                    variables: { boardId: params.id },
                    data: {
                        boards: data.updateBoardsOrder,
                    },
                })
            },
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
    return { isBoardOrderUpdating }
}
export default useSortableBoards
