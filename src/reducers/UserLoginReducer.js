import { LOGIN_USER, LOGOUT_USER, COMPANY_INFO } from '../actions/UserLoginAction'

const initialState = {
  isUserLoggedIn: true,
  isAdmin: true,
  companyInfo: [],
}

const UserLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isUserLoggedIn: true,
        isAdmin: action.payload ? action.payload.isAdmin : false,
      }
    case LOGOUT_USER:
      return {
        ...state,
        isUserLoggedIn: false,
        isAdmin: false,
        companyInfo: [],
      }
    case COMPANY_INFO:
      return {
        ...state,
        companyInfo: action.companyInfo,
      }
    default:
      return state
  }
}

export default UserLoginReducer
