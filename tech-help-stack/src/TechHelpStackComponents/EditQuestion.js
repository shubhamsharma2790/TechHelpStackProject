import {useState} from 'react';
import '../styles/EditQuestion.css';
function EditQuestion(props){
	const [edited_question,setEditedQuestion] = useState('');
	const [requestStatus,setRequestStatus] = useState({'isLoaded':false,'postSuccess':false});
	function handleQuestionChange(event){
			setEditedQuestion(event.target.value);
	}
	function editQuestion(){
		
		var url='http://localhost:8080/api/question/edit/'+props.question_data.id+'?content='+edited_question;
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
			return response.json();
		}).catch(e=>setRequestStatus({isLoaded:true,postSuccess:false,'status':e.message}));
	}
	function deleteQuestion(){
		
		var url='http://localhost:8080/api/question/delete/'+props.question_data.id;
		fetch(url,{method:'DELETE',
			mode:'cors',
			credentials:'include',
			headers:{'Content-Type':'application/json',
			'Authorization':props.accessToken}}).then((response)=>{
			let p = response.json();
			if(response.ok){
					p.then(data=>setRequestStatus({isLoaded:true,postSuccess:true,'status':data.status}));
			}else{
					p.then(data=>setRequestStatus({isLoaded:true,postSuccess:false,'status':data.message}));

			}
			return response.json();
		}).catch(e=>setRequestStatus({isLoaded:false,postSuccess:false,'status':e.message}));
	}

	return (<div className="edit-question-wrapper">
			<textarea id="edit-question" defaultValue={props.question_data.content} className="edit-question-text" onInput={handleQuestionChange}></textarea>
			<button className="edit-question-button" onClick={editQuestion}>Submit Change</button><br/>
			<br/>
			<button className="delete-question-button" onClick={deleteQuestion}>Delete Question</button>
			{(requestStatus.isLoaded)?((requestStatus.postSuccess)?<p className="green-text">{requestStatus.status}</p>:<p className="red-text">Failed to Edit/Delete Question : {requestStatus.status}</p>):<p></p>}
	</div>);
}

export default EditQuestion;