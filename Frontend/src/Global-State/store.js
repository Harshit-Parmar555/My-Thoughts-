import {configureStore,createSlice} from "@reduxjs/toolkit"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const authslice = createSlice({
    name : 'auth',
    initialState:{
        islogin : false
    },
    reducers:{
        login(state){
            state.islogin = true
        },
        logout(state){
            state.islogin = false
        }
    }
})

export const authActions = authslice.actions

const persistConfig = {
    key : "root",
    storage,
}

const persistedReducer =  persistReducer(persistConfig,authslice.reducer)

export const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store);

export {persistor}