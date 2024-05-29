export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const COMPANY_INFO = 'COMPANY_INFO'

export const loginUser = (isUserLogged, isAdmin) => ({
  type: LOGIN_USER,
  isUserLogged,
  isAdmin,
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: {
    isUserLogged: false,
    isAdmin: false,
    IdWlascicielaFirmy: null,
  },
})

export const companyInfo = (companyInfo) => ({
  type: COMPANY_INFO,
  companyInfo,
})
