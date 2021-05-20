import {useState} from 'react';
import '../styles/AskQuestion.css';
import '../styles/GiveAnswer.css';
function GiveAnswer(props){
	const [given_answer,setGivenAnswer] = useState('');
	const [requestStatus,setRequestStatus] = useState({'isLoaded':false,'postSuccess':false,status:''});
	function handleAnswerChange(event){
			setRequestStatus({'isLoaded':false,'postSuccess':false,status:''});
			setGivenAnswer(event.target.value);
	}
	function createAnswer(){
		var url='http://localhost:8080/api/question/'+props.question_data.id+'/answer/create?answer=';
		url+=given_answer;
		fetch(url,{method:'POST',
			mode:'cors',
			credentials:'include',
			headers:{'Content-Type':'application/json',
			'Authorization':props.accessToken}}).then((response)=>{
			let p=response.json();
			if(response.ok){
					p.then(data=>setRequestStatus({isLoaded:true,postSuccess:true,'status':data.status}));
			}else{
					p.then(data=>setRequestStatus({isLoaded:true,postSuccess:false,'status':data.message}));
			}
		}).catch(e=>setRequestStatus({isLoaded:false,postSuccess:false,'status':e.message}));
	}

	return (<div className="give-answer-wrapper">
			<p className="question-content"> {props.question_data.content}</p>
			<textarea id="asked-question" className="give-answer-text" onInput={handleAnswerChange}></textarea>
			<button className="post-question-button" onClick={createAnswer}>Post Answer</button>
			{(requestStatus.isLoaded)?((requestStatus.postSuccess)?<p className="green-text">Question Successfully Answered</p>:<p className="red-text">Failed to Post Answer : {requestStatus.status}</p>):<p className="red-text">{requestStatus.status}</p>}
	</div>);
}

export default GiveAnswer;