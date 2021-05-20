
function SignUpForm(props){
	return (
		<div className="signup-content">
    	<p className={"response-message "+props.response_message.className}>{props.response_message.message}</p>
    	<h4 align="center"> Please fill the details to sign up</h4>
    	
    	<form>
    	<div className="signup-field-wrapper">
	    	<label>First Name :</label>
	    		<input name="first_name" required={true} type = "text" placeholder="Enter First Name" onChange={props.changeInput}/>
		</div>
		<div className="signup-field-wrapper">
	    	<label>Last Name :</label>
	    		<input name="last_name" required={true} type = "text" placeholder="Enter Last Name" onChange={props.changeInput}/>
		</div>
		<div className="signup-field-wrapper">
			<label>Username :</label>
	    		<input name="user_name" required={true} type = "text" placeholder="Enter Username" onChange={props.changeInput}/>
	    </div>
	    <div className="signup-field-wrapper">
			<label>Password :</label>
	    		<input name="password" required={true} type = "text" placeholder="Enter Password" onChange={props.changeInput}/>
	    </div>
    	<div className="signup-field-wrapper">					
			<label>Email Address :</label>
	    		<input name="email_address" required={true} type = "email" placeholder="Enter Email" onChange={props.changeInput}/>
	    </div>
		<div className="signup-field-wrapper">		
			<label>Country :</label>
	    		<input name="country" required={true} type = "text" placeholder="Enter Country" onChange={props.changeInput}/>
	    </div>
		<div className="signup-field-wrapper">
			<label>Tell us about yourself :</label>
	    		<textarea name="aboutMe" required={true} cols="50" rows="6" placeholder="Tell Us About Yourself. . . " onChange={props.changeInput}/>
	    </div>
    	<div className="signup-field-wrapper">
			<label>Date of Birth :</label>
	    		<input name="dob" required={true} type = "date" onChange={props.changeInput}/>
	    </div>
    	<div className="signup-field-wrapper">
	    	<label>Contact Number :</label>
	    		<input name="contact_number" required={true} type = "text" placeholder="Enter Contact Number" onChange={props.changeInput}/>
    	</div>

    	<div className="signin-field-wrapper">
	    	<input className="signup-sumbit" type = "submit" value="Sign Up" onClick={props.doSignup}/>
    	</div>
    	</form>
    </div>);

}
export default SignUpForm;


