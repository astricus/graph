import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'

const middlewareEnhancer = applyMiddleware(thunk)
let store
const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducer,
    composeWithDevTools(middlewareEnhancer)
  )
} else {
  store = createStore(rootReducer)
}

export default store
