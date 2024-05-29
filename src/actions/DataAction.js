export const UPDATE_DATA = 'UPDATE_DATA'
export const UPDATE_USER = 'UPDATE_USER'

export const updateData = (aboutCompany) => ({
  type: UPDATE_DATA,
  aboutCompany,
})

export const updateUser = (aboutUser) => ({
  type: UPDATE_USER,
  aboutUser,
})
