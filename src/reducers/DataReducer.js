import { UPDATE_DATA, UPDATE_USER } from '../actions/DataAction'
import { aboutCompany } from '../data/aboutCompany'
import { clientsUsersTable } from '../data/clientsUsersTable'

const initialState = {
  aboutCompany: aboutCompany,
  aboutUser: clientsUsersTable,
}

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        aboutCompany: action.aboutCompany,
      }
    case UPDATE_USER:
      return {
        ...state,
        aboutUser: action.aboutUser,
      }

    default:
      return state
  }
}

export default DataReducer
