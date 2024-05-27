import { configureStore } from '@reduxjs/toolkit'

import UserLoginReducer from '../reducers/UserLoginReducer'

const store = configureStore({
  reducer: {
    UserLoginReducer,
  },
})
// import { createStore } from 'redux'
// export const store = createStore(UserLoginReducer)

export { store }
