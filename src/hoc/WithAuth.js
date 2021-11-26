
import { useAuth } from './../customHooks';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;

//withRouter gives you acces to props.history so now you can redirect on auth check