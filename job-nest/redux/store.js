import { combineReducer, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "react-redux"
import storage from "redux-persist/lib/storage"
import userReducer from "./user/UserSlice.js"

const rootReducer = combineReducer({ user: userReducer})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, persistReducer);

export const store = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware)=>{
        getDefaultMiddleware({
            serializableCheck: false,
        })
    }
})
export const persistor = persistStore(store)