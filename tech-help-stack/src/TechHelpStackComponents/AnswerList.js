import {useState,useEffect} from 'react';
import '../styles/AnswerList.css';
import {Link} from 'react-router-dom';
function AnswerList(props){
	const [isLoaded,setIsLoaded] = useState(false);
	const [answer_list,setAnswerList] = useState(null);
	function request_answers(){
		setIsLoaded(false);
		var url='http://localhost:8080/api/answer/all/'+props.question_data.id;
		fetch(url,{method:'GET',mode:'cors',credentials:'include',headers:{'Authorization':props.accessToken}}).then((response)=>{
			setIsLoaded(true);
			return response.json();
		}).then((data)=>setAnswerList(data)).catch(e=>{setAnswerList(null);setIsLoaded(false)});
		
	};
	useEffect(()=>{
		request_answers();
	},[]);



	const list_jsx = ()=>{
		if(answer_list!=null && answer_list.length && isLoaded){
			return (
				<div>
				<div className="question-answer-list-wrapper"> 
					<button className="question-answer-list-refresh" onClick={()=>request_answers()}>Refresh</button>
						<p className="questionContent">{answer_list[0].questionContent}</p>
						{answer_list.map((item)=>(
						<div className="question-answer-on-list">
							<div className="question-answer-content green-text">
								<p>{item.answerContent}</p>
								{(props.editMode!==undefined)?<ul><li key="1"><Link className="question-option" to={`${props.url}/answer/edit-delete`} onClick={()=>props.setAnsData({id:item.id,content:item.answerContent})}>Edit/Delete</Link></li></ul>:''}
							</div>	
						</div>
				
				))}</div></div>);
		}
		else{
			if(isLoaded && answer_list!==null && answer_list.length===0){
				return (<div className="question-answer-list-wrapper">
					<p className="questionContent">{props.question_data.content}</p>
					<p className='red-text'>There are no answers to this question yet.</p>
				</div>);	
			}else{
				if(isLoaded && answer_list==null){
					return (<div className="question-answer-list-wrapper">
				<p className="red-text">Could not load answers. . . . .</p>
				</div>);	
				}else{
					return (<div className="question-answer-list-wrapper">
						<p>Please wait loading answers. . . . .</p>
					</div>);
				}
				
			}
			
		}
	}
	return (list_jsx());

}

export default AnswerList;