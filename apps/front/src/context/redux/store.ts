import { combineReducers, createStore } from '@reduxjs/toolkit'
import { initialState, user } from './user'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const saveToLocalStorage = (store: { auth: typeof initialState }) => {
    try {
        const serializedStore = JSON.stringify(store)
        window.localStorage.setItem('store', serializedStore)
    } catch (error) {
        console.log(error)
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedStore = window.localStorage.getItem('store')
        if (serializedStore === null) return undefined
        return JSON.parse(serializedStore)
    } catch (error) {
        console.log(error)
        return undefined
    }
}
const rootReducer = combineReducers({ auth: user.reducer })

const persistedState = loadFromLocalStorage()

export const store = createStore(rootReducer, persistedState)

store.subscribe(() => saveToLocalStorage(store.getState()))
