import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewareEnhancer = applyMiddleware(thunk)
let store
const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    persistedReducer,
    composeWithDevTools(middlewareEnhancer)
  )
} else {
  store = createStore(persistedReducer, middlewareEnhancer)
}

const persistor = persistStore(store)

export { store, persistor }
