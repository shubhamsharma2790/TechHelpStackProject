import '../styles/Dashboard.css';
import {NavLink,Switch,useRouteMatch,Route} from 'react-router-dom'
import UserHome from './UserHome.js';
import ManageQuestions from './ManageQuestions.js';
import Profiles from './Profiles.js';
import ManageAnswers from './ManageAnswers.js';
import {useState} from 'react'

export default function Dashboard(props){
    let {path,url} = useRouteMatch();
    const [userDetails,setUserDetails] = useState({'id':sessionStorage.getItem('id'),'accessToken':sessionStorage.getItem('accessToken')});
    const [signOutResponse,setSignOutResponse] = useState({'messageClass':'hidden','message':''});
    function signOut(){
      setUserDetails({id:undefined,accessToken:undefined});
      setSignOutResponse({'messageClass':'wait','message':'Please wait'});
      sessionStorage.clear(); //Clearing session variables
      var url='http://localhost:8080/api/user/signout';
      fetch(url,{
      method:'POST',
      mode:'cors',
      credentials:
      'include',headers:{'Authorization':userDetails.accessToken}})
      .then((response)=>{
          let p=response.json();
          if(!response.ok){
            p.then((data)=>setSignOutResponse({'messageClass':'failure','message':data.status}));
          }else{
            p.then((data)=>setSignOutResponse({'messageClass':'success','message':data.message}));
            window.location.href='http://localhost:3000';
          }

      }).catch(data=>setSignOutResponse({'messageClass':'failure','message':data.message}));
    
  }
    return (
        <div className="dashboard-content">
            <div className="top-bar">
                <div className="banner">
                    
                    <h2>Welcome to Tech Help Stack!</h2>
                    
                    <ul className="nav-bar">
                      <li><button onClick={signOut} className="active-nav-link">Sign Out</button></li>
                      <li><NavLink to={`${url}/profiles`} activeClassName="active-nav-link">Profiles</NavLink></li>
                      <li><NavLink to={`${url}/user/answers`} activeClassName="active-nav-link">Manage Answers</NavLink></li>
                      <li><NavLink to={`${url}/user/questions`} activeClassName="active-nav-link">Manage Questions</NavLink></li>
                      <li><NavLink to={`${url}/user/home`} activeClassName="active-nav-link">Home</NavLink></li>                      
                    </ul>      
                
                </div>
                
            </div>
            <Switch>
                  <Route path={`${path}/user/home`} render={(p) => (<UserHome {...p} accessToken={userDetails.accessToken} />)} />
                  <Route path={`${path}/user/questions`} render={(p) => (<ManageQuestions {...p} user_id={userDetails.id} accessToken={userDetails.accessToken} />)} />
                  <Route path={`${path}/user/answers`} render={(p) => (<ManageAnswers {...p} user_id={userDetails.id} accessToken={userDetails.accessToken} />)} />
                  <Route path={`${path}/profiles`} render={(p) => (<Profiles {...p} user_id={userDetails.id} accessToken={userDetails.accessToken} />)} />
            </Switch>
        <p className={'response-message-bottom '+signOutResponse.messageClass}>{signOutResponse.message}</p>    
        </div>)
}