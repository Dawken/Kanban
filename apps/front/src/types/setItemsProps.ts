import { Dispatch, SetStateAction } from 'react'

export type SetItemsAction<T> = Dispatch<SetStateAction<T[]>>
