import { ExtendedUser } from '@/next-auth'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    user: ExtendedUser | null
}

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState['user']>) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer;