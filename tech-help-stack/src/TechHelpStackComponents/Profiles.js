import ShowProfile from './ShowProfile.js';
import SearchProfile from './SearchProfile.js';
import '../styles/UserHome.css';
import {NavLink,Switch,Route,useRouteMatch} from 'react-router-dom'
function Profiles(props){
	let {path,url} = useRouteMatch();
  
	return (
		<div className="user-home-content">
		<div className="to-do-options">
                <NavLink to={`${url}`}>My Profile</NavLink>
                <NavLink to={`${url}/profiles/search`}>Search/ Delete Profile</NavLink>    
            </div>
        <div>
        <Switch>
           <Route exact path={path} render={(p) => (<ShowProfile {...p} user_id={props.user_id} accessToken={props.accessToken} />)} />
           <Route exact path={`${url}/profiles/search`} render={(p) => (<SearchProfile {...p} user_id={props.user_id} accessToken={props.accessToken} />)} />
           
        </Switch>
        
        </div>
		</div>);

}
export default Profiles;