
import { useAuth } from './../customHooks';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;
// higher order component makes a change and returns the component
// so in this case we call the custom hook useAuth to grab the current user from the redux-store
// children just refers to the components that are rendered within the WithAuth tag in the App.js file