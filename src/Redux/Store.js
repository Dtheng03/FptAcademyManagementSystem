import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from './Reducer/UsersSlice'
import RoleSlice from './Reducer/RoleSlice'
import ClassSlice from './Reducer/ClassSlice'
import ProgramTranningSlice from './Reducer/ProgramTranningSlice'
import outlineSlice from './Reducer/outlineSlice'

export const store = configureStore({
    reducer: {
        users: UsersSlice,
        role: RoleSlice,
        class: ClassSlice,
        program: ProgramTranningSlice,
        outline: outlineSlice,
    }
})



// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, {
//   role: RoleSlice,
//   user: UserSlice,
// });

// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

// export { store, persistor };
