import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './Reducer/UserSlice'
import RoleSlice from './Reducer/RoleSlice'
export const store = configureStore({
    reducer: {
        user: UserSlice,
        role: RoleSlice,

    }
})