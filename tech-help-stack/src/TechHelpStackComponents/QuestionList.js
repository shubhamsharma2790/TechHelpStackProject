
import '../styles/QuestionList.css';
import {useEffect,useState} from 'react';
import Question from './Question.js';
function QuestionList(props){
	const [request_data,setRequestData] = useState({'isLoaded':false,'question_list':[]});
	function request_questions(){
		setRequestData({'isLoaded':false,'question_list':[]});
		var url='http://localhost:8080/api/question/all';
		if(props.user_id){
			url=url+'/'+props.user_id;
		}
		
		fetch(url,{method:'GET',mode:'cors',credentials:'include',headers:{'Authorization':props.accessToken}}).then((response)=>{
			let p=response.json();	
			if(!response.ok){
				p.then((data)=>setRequestData({'isLoaded':true,'question_list':null,'message':data.message}))
			}else{
				p.then((data)=>setRequestData({'isLoaded':true,'question_list':data}))
			}
			
		});
		
	};
	useEffect(()=>{
		
		request_questions();

	},[]);

	return (function(){
		if(request_data.question_list!==null && request_data.question_list.length && request_data.isLoaded){
			return (<div className="question-answer-list-wrapper"> 
					<button className="question-answer-list-refresh" onClick={()=>request_questions()}>Refresh</button>
				{request_data.question_list.map((item)=>(
						<div className="question-answer-list">
									<Question content={item.content} url={props.url} user_id={props.user_id} id={item.id} setQuestionData={props.setQuestionData}/>
						</div>
				
				))}</div>);
		}
		return (<div className="question-answer-list-wrapper">{(!request_data.isLoaded)?<p>Please wait. . . Loading Questions</p>:(request_data.question_list===null)?<p className="red-text">A network error occured : {request_data.message}</p>:<p className="red-text">There are no questions to show</p>}</div>);
	}());// end of render return
}
export default QuestionList