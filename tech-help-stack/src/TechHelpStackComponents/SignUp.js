// import styles from styles folder
import {useState} from 'react';
import '../styles/SignUp.css';
import SignUpForm from './SignUpForm.js';
import {Redirect} from 'react-router-dom';
function SignUp() {
	var [form_data,setFormdata] =  useState({ first_name:null,
						last_name:null,
						user_name:null,
						email_address:null,
						password:null,
						country:null,
						aboutMe:null,
						dob:null,
						contact_number:null
					});
	var [response_message,setResponseMessage] = useState({message:"",'className':'hidden'});
	

	function changeInput(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		var x = form_data;
		x[name]=value;
		setFormdata(x);
	}
	function doSignup(event){
		event.preventDefault();
		setResponseMessage({message:'Please wait. . .',className:'wait'});
		// const data = { "first_name":"ShubhamC",
		// 				"last_name":"Sharma",
		// 				"user_name":"shubham2720",
		// 				"email_address":"shubhamsharma2720@gmail.com",
		// 				"password":"shubham123",
		// 				"country":"India",
		// 				"aboutMe":"ShubhamA is an expert.",
		// 				"dob":"08/10/1971",
		// 				"contact_number":"6752667711"
		// 			}
		
		fetch('http://localhost:8080/api/user/signup',{
			method:'POST',
			mode:'cors',
			body:JSON.stringify(form_data),
			headers:{'Content-Type':'application/json'}})
		.then((response)=>{
			var p=response.json();
			if(!response.ok){
				p.then(response => {throw new Error(response.message)}).catch(e=>{setResponseMessage({message:"SignUp Failed : "+e.message,'className':'failure'});});
			}
			else{
				setResponseMessage({message:"SignUp Successful!!! Taking you to Sign In Page",'className':'success'});
				return p;
			}});

	}
  
  return (
  	(response_message.className.indexOf("success")!==-1)?function(){setTimeout(()=>{},3000);return <Redirect to="/signin"/>}():<SignUpForm response_message={response_message} doSignup={doSignup} changeInput={changeInput}/>);
}

export default SignUp;
