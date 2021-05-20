// import styles from styles folder
import '../styles/SignIn.css';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
function SignIn(props) {
	var [form_data,setFormData] = useState({username:null,password:null});
	var [response_message,setResponseMessage] = useState({message:"",'className':'hidden'});
	function changeSigninInput(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		var x = form_data;
		x[name]=value;
		setFormData(x);
	}
	function doSignin(event){
		// Stop the form button from submitting. . . .
		event.preventDefault();
		setResponseMessage({message:'Please wait. . .',className:'wait'});
		var creds = btoa(form_data.username+':'+form_data.password);
		creds='Basic '+creds;
		fetch('http://localhost:8080/api/user/signin',{
			method:'POST',
			mode:'cors',
			body:JSON.stringify(form_data),
			headers:{'Content-Type':'application/json',
					'Authorization':creds}})
		.then((response)=>{
			var p=response.json();
			if(!response.ok){
				p.then(e =>setResponseMessage({message:"SignUp Failed : "+e.message,'className':'failure'}));
			}
			else{
				setResponseMessage({message:"Sign In Successful!!! Taking you to Dashboard",'className':'success'});
				p.then((data)=>props.logInStatusUpdate(data.id,response.headers.get('access-token')));				
				return p;
			}}).catch(e=>setResponseMessage({message:"A network error occurred : "+e.message,'className':'failure'}));
	}
  return (function(){
  		if(response_message.className.indexOf("success")!==-1){
  			return <Redirect to="/dashboard"/>
  		}else{
  			return (<div className="signin-content">
    		<h4 align="center">Login</h4>
    		<p className={"response-message "+response_message.className}>{response_message.message}</p>
    	<form>
    	<div className="signin-field-wrapper">
	    	<label>Username :</label>
	    		<input name = "username" type = "text" placeholder="Enter Username" onChange={changeSigninInput}/>
		</div>
		<div className="signin-field-wrapper">
	    	<label>Password :</label>
	    		<input name = "password" type = "password" placeholder="Enter Password" onChange={changeSigninInput}/>
		</div>
		<div className="signin-field-wrapper">
	    	<input className="signup-sumbit" type = "submit" value="Sign In" onClick={doSignin}/>
    	</div>
		</form>
	</div>);
  		}
  }()  
  );
}

export default SignIn;
