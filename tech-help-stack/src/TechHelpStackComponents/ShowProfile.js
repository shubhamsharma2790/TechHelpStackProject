import {useState,useEffect} from 'react';
import '../styles/ShowProfile.css';

function ShowProfile(props){
	const [user_data,setUserData] = useState(null);
	const [requestStatus,setReqStatus] = useState({isLoaded:false,isSuccess:false,error:null});
	useEffect(()=>{
		setReqStatus({isLoaded:false,isSuccess:false,error:''});
		if(props.user_id){
			var url='http://localhost:8080/api/userprofile/'+props.user_id;
			fetch(url,{
			method:'GET',
			mode:'cors',
			credentials:
			'include',headers:{'Authorization':props.accessToken}})
			.then((response)=>{
				let p=response.json();
				if(!response.ok){
					p.then(data=>setReqStatus({isLoaded:true,isSuccess:false,error:data.message}));
				}else{
					p.then((data)=>{setReqStatus({isLoaded:true,isSuccess:true,error:null});setUserData(data)})
					return p;
				}
		});
		
		}
		
	},[]);
	const show_profile_jsx = ()=>{
		if(!props.user_id){
			return (<p className="red-text text-center">No user id provided</p>);
		}
		if(!requestStatus.isLoaded){
			return <p>Please wait. . . </p>
		}
		if(requestStatus.isLoaded && requestStatus.isSuccess && user_data!=null){
			return	(<>
			{(props.user_id!==undefined)?(<><p className="overflow-wrap-break-word text-center width-100-percent bold">User ID: {props.user_id}</p><br/></>):''}
			<p className="text-center width-50-percent float-left">Name :</p> <p className="overflow-wrap-break-word text-center width-50-percent float-left bold">{user_data.first_name+' '+user_data.last_name} </p>
			<p className="text-center width-50-percent float-left">Username :</p> <p className="overflow-wrap-break-word text-center width-50-percent float-left bold">{user_data.user_name}</p>
			<p className="text-center width-50-percent float-left">Email :</p> <p className="overflow-wrap-break-word text-center width-50-percent float-left bold">{user_data.email_address}</p>
			<p className="text-center width-50-percent float-left">Country :</p> <p className="overflow-wrap-break-word text-center width-50-percent float-left bold">{user_data.country}</p>
			<p className="text-center width-50-percent float-left">About Me :</p> <p className="overflow-wrap-break-word text-center width-50-percent float-left bold">{user_data.aboutMe}</p>
			<p className="text-center width-50-percent float-left">Date of Birth :</p> <p className="overflow-wrap-break-word text-center width-50-percent float-left bold">{user_data.dob}</p></>);
		}else{
			if(requestStatus.isLoaded && !requestStatus.isSuccess){
				return (<><p className="text-center"> Following error occurred while displaying the profile :</p>
				<p className="text-center red-text">{requestStatus.error}</p></>);
			}
		}
		
	
	}
	return (<div className="show-profile-wrapper overflow-hidden">
			{show_profile_jsx()}			
		</div>
		)
}
export default ShowProfile;