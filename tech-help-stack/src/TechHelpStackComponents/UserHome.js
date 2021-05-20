import QuestionList from './QuestionList.js';
import AskQuestion from './AskQuestion.js';
import AnswerList from './AnswerList.js';
import GiveAnswer from './GiveAnswer.js';
import '../styles/UserHome.css';
import {useState} from 'react';
import {NavLink,Switch,Route,useRouteMatch} from 'react-router-dom'
function UserHome(props){
	let {path,url} = useRouteMatch();
  const [question_data,setQuestionData] = useState(null);
  function setQID(data){
    setQuestionData(data);
  }
	return (
		<div className="user-home-content">
		<div className="to-do-options">
                <NavLink className="ask-a-question" to={`${url}/question/ask`}>Ask a question</NavLink>
            </div>
        <div>
        <Switch>
           <Route exact path={path} render={(p) => (<QuestionList {...p} url={url} setQuestionData={setQID} user_id={undefined} accessToken={props.accessToken} />)} />
           <Route path={`${path}/question/ask`} render={(p) => (<AskQuestion {...p} accessToken={props.accessToken} />)} />         
           <Route path={`${path}/answers`} render={(p) => (<AnswerList {...p} url={url} question_data={question_data} accessToken={props.accessToken} />)} />         
           <Route exact path={`${path}/answer`} render={(p) => (<GiveAnswer {...p} question_data={question_data} accessToken={props.accessToken} />)} />         
        </Switch>
        
        </div>
		</div>);

}
export default UserHome;