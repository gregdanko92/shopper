import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    resetPasswordSuccess: false, 
    userErr: []
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case userTypes.SIGN_IN_SUCCESS: //this is dispatched from the relevant sign in saga
            return{
                ...state,
                currentUser: action.payload, //sets the current user in the store as they payload from the user action, and therefore from the user sign in saga generator function which acquired the user SNAPSHOT
                userErr: []
        }
        
        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case userTypes.USER_ERROR:
            return {
                ...state,
                userErr: action.payload
            }
        case userTypes.RESET_USER_STATE: //stacked these together
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE // change the state to currentUser:null, 
            }
        default:
            return state
    }
}
export default userReducer
