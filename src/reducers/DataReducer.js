import { UPDATE_DATA } from '../actions/DataAction'
import { aboutCompany } from '../data/aboutCompany'

const initialState = {
  aboutCompany: aboutCompany,
}

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        aboutCompany: action.aboutCompany,
      }

    default:
      return state
  }
}

export default DataReducer
