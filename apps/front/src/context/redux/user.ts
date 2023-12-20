import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
    isLoggedIn: false,
}

export const user = createSlice({
    name: 'clientResponse',
    initialState,
    reducers: {
        getClientResponse: (
            state,
            action: PayloadAction<{ isLoggedIn: boolean }>
        ) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})

export const { getClientResponse } = user.actions
