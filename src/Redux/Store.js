import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './Reducer/UserSlice'
import RoleSlice from './Reducer/RoleSlice'
export const store = configureStore({
    reducer: {
        user: UserSlice,
        role: RoleSlice,

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
