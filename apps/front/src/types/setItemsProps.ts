import { BoardProps } from '@src/types/board/boardProps'
import { Dispatch, SetStateAction } from 'react'

export type SetItemsAction = Dispatch<SetStateAction<BoardProps[]>>
