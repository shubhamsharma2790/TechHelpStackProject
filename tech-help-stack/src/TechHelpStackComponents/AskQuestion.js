import {useState} from 'react';
import '../styles/AskQuestion.css';
function AskQuestion(props){
	const [asked_question,setAskedQuestion] = useState('');
	const [requestStatus,setRequestStatus] = useState({'isLoaded':false,'postSuccess':false});
	function handleQuestionChange(event){
			setAskedQuestion(event.target.value);
	}
	function createQuestion(){
		var url='http://localhost:8080/api/question/create?content='+asked_question;
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
			return response.json();
		}).catch(e=>setRequestStatus({isLoaded:false,postSuccess:false,'status':e.message}));
	}

	return (<div className="ask-question-wrapper">
			<p> Write your question here</p>
			<textarea id="asked-question" className="ask-question-text" onInput={handleQuestionChange}></textarea>
			<button className="post-question-button" onClick={createQuestion}>Post Question</button>
			{(requestStatus.isLoaded)?((requestStatus.postSuccess)?<p className="green-text">Question Successfully Posted</p>:<p className="red-text">Failed to Post Question : {requestStatus.status}</p>):<p className="red-text">{requestStatus.status}</p>}
	</div>);
}

export default AskQuestion;