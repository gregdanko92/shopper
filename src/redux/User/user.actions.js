import userTypes from './user.types'

export const setCurrentUserAction = user => ({
    type: userTypes.setCurrentUser,
    payload: user
})