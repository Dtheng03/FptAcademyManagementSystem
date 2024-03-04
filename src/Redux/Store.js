import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from './Reducer/UsersSlice'
import RoleSlice from './Reducer/RoleSlice'
import ClassSlice from './Reducer/ClassSlice'
export const store = configureStore({
    reducer: {
        users: UsersSlice,
        role: RoleSlice,
        class: ClassSlice,
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
