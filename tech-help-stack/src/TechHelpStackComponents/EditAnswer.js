import {useState} from 'react';
import '../styles/EditAnswer.css';
function EditAnswer(props){
	const [edited_answer,setEditedAnswer] = useState('');
	const [requestStatus,setRequestStatus] = useState({'isLoaded':false,'postSuccess':false});
	function handleAnswerChange(event){
			setEditedAnswer(event.target.value);
	}
	function editAnswer(){
		
		var url='http://localhost:8080/api/answer/edit/'+props.answer_data.id+'?content='+edited_answer;
		fetch(url,{method:'PUT',
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
	function deleteAnswer(){
		
		var url='http://localhost:8080/api/answer/delete/'+props.answer_data.id;
		fetch(url,{method:'DELETE',
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

	return (<div className="edit-answer-wrapper">
			
			<textarea id="edit-answer" defaultValue={props.answer_data.content} className="edit-answer-text" onInput={handleAnswerChange}></textarea>
			<button className="edit-answer-button" onClick={editAnswer}>Submit Change</button><br/>
			<br/>
			<button className="delete-question-button" onClick={deleteAnswer}>Delete Answer</button>
			{(requestStatus.isLoaded)?((requestStatus.postSuccess)?<p className="green-text">{requestStatus.status}</p>:<p className="red-text">Failed to Edit/Delete Question : {requestStatus.status}</p>):<p className="red-text">{requestStatus.status}</p>}
	</div>);
}

export default EditAnswer;