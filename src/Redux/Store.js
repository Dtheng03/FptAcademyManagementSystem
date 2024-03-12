import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from './Reducer/UsersSlice'
import RoleSlice from './Reducer/RoleSlice'
import ClassSlice from './Reducer/ClassSlice'
import ProgramTranningSlice from './Reducer/ProgramTranningSlice'
import outlineSlice from './Reducer/outlineSlice'
import fileUploadSlice from './Reducer/fileUploadSlice'

export const store = configureStore({
    reducer: {
        users: UsersSlice,
        role: RoleSlice,
        class: ClassSlice,
        program: ProgramTranningSlice,
        outline: outlineSlice,
        file: fileUploadSlice,
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
