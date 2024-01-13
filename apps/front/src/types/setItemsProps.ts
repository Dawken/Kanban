import { BoardProps } from '@src/types/boardProps'
import { Dispatch, SetStateAction } from 'react'

export type SetItemsAction = Dispatch<SetStateAction<BoardProps[]>>
