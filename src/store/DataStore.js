import { configureStore } from '@reduxjs/toolkit'

import DataReducer from '../reducers/DataReducer'

const dataStore = configureStore({
  reducer: {
    DataReducer,
  },
})
// import { createStore } from 'redux'
// export const store = createStore(UserLoginReducer)

export { dataStore }
