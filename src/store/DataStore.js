import { configureStore } from '@reduxjs/toolkit'

import DataReducer from '../reducers/DataReducer'

const dataStore = configureStore({
  reducer: {
    DataReducer,
  },
})

export { dataStore }
