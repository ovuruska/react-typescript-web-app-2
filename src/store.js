import {createStore, applyMiddleware} from "redux"
import {configureStore} from '@reduxjs/toolkit'
import reduxThunk from "redux-thunk"
import {createLogger} from "redux-logger"
import reducer from "./reducers"

const IGNORED_ACTIONS = []

const predicate = (ignoredActions) => (getState, {type, _}) => {
    for (let actionType of ignoredActions) {
        if (actionType === type) return false
    }
    return true
}
const logger = createLogger({
    predicate: predicate(IGNORED_ACTIONS)
})


const store = configureStore({
        reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }).concat([
        logger
    ])
    }
)


export default store