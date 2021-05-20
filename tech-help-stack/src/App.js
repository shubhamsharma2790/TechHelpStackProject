import Home from './TechHelpStackComponents/Home';
import SignIn from './TechHelpStackComponents/SignIn';
import SignUp from './TechHelpStackComponents/SignUp';
import Dashboard from './TechHelpStackComponents/Dashboard';
import './styles/Common.css';
import {Switch, Route,Redirect,useHistory} from 'react-router-dom';

function isLoggedIn(){
    return (sessionStorage.getItem('id')!==null && sessionStorage.getItem('accessToken')!==null);
}

function TechHelpStackApp() {
  const history = useHistory();
  function logInStatusUpdate(user_id,access_token){
    sessionStorage.setItem('id',user_id);
    sessionStorage.setItem('accessToken',access_token);
    history.replace("/dashboard");
  }
  return (
    <div>
      
      <div className="content">
      
          <Switch>
              <Route exact path="/" render={(props) => ((!isLoggedIn())?<Home {...props}/>:<Redirect to="/dashboard"/>)}/>
              <Route path='/signin' render={(props) => ((!isLoggedIn())?<SignIn {...props} logInStatusUpdate={logInStatusUpdate} />:<Redirect to="/dashboard"/>)}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/dashboard" render={(props) => (isLoggedIn()?<Dashboard {...props}/>:<Redirect to="/signin"/>)}/>
          </Switch>    
      
      </div>
    </div>
  );
}

export default TechHelpStackApp;
