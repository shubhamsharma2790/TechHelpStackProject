import QuestionList from './QuestionList.js';
import AnswerList from './AnswerList.js';
import GiveAnswer from './GiveAnswer.js';
import EditQuestion from './EditQuestion.js';
import EditAnswer from './EditAnswer.js';
import '../styles/UserHome.css';
import {useState} from 'react';
import {Switch,Route,useRouteMatch} from 'react-router-dom'
function ManageQuestions(props){
	let {path,url} = useRouteMatch();
  const [question_data,setQuestionData] = useState(null);
  const [answer_data,setAnswerData] = useState(null);
  function setQID(data){
    setQuestionData(data)
    
  }
  function setAnswerInfo(data){
    setAnswerData(data)
    
  }
	return (
		<div className="user-home-content">
		<div className="to-do-options">
                <p align="center" className="text-size-120 bold">Manage Questions</p>
            </div>
        <div>
        <Switch>
           <Route exact path={path} render={(p) => (<QuestionList {...p} url={url} setQuestionData={setQID} user_id={props.user_id} accessToken={props.accessToken} />)} />
           <Route exact path={`${path}/answers`} render={(p) => (<AnswerList {...p} url={url} question_data={question_data} editMode={true} setAnsData={setAnswerInfo} accessToken={props.accessToken} />)} />         
           <Route exact path={`${path}/answer`} render={(p) => (<GiveAnswer {...p} question_data={question_data} accessToken={props.accessToken} />)} />         
           <Route exact path={`${path}/edit-delete`} render={(p) => (<EditQuestion {...p} question_data={question_data} accessToken={props.accessToken} />)} />         
           <Route exact path={`${path}/answer/edit-delete`} render={(p) => (<EditAnswer {...p} answer_data={answer_data} accessToken={props.accessToken} />)} />         
           
        </Switch>
        
        </div>
		</div>);

}
export default ManageQuestions;