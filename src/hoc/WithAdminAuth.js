import { useAdminAuth } from './../customHooks'
const WithAdminAuth = props => useAdminAuth(props.children) && props.children

export default WithAdminAuth

//HERE we will check for admin rights, based on that we protect the page
//use a custom hook