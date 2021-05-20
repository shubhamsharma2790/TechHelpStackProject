import {Link} from 'react-router-dom';
import '../styles/Question.css';
function Question(props){
	const questionOptions=()=>{

		
		if(props.user_id!==undefined){
			return (<><li key={'1'}><Link to={`${props.url}/edit-delete`} className="question-option" onClick={()=>props.setQuestionData({id:props.id,content:props.content})}>Edit/Delete</Link></li></>);
		}else{
			return (<><li key={'2'}><Link to={`${props.url}/answer`} className="question-option" onClick={()=>props.setQuestionData({id:props.id,content:props.content})}>Answer This Question</Link></li>
					<li key={'3'}><Link to={`${props.url}/answers`} className="question-option" onClick={()=>props.setQuestionData({id:props.id,content:props.content})}>View All Answers</Link></li></>);
		}

	}
	
	return (
		<div className="question-answer-on-list">
			
			<div className="question-answer-content">
					<p>{props.content}</p>		
			</div>
			<div className="question-options">
				<ul>
					{questionOptions()}
				</ul>	
			</div>
		</div>
		);
}
export default Question;