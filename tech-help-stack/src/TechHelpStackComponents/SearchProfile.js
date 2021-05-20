import ShowProfile from './ShowProfile.js';
import {useState} from 'react';
import '../styles/ShowProfile.css';

function SearchProfile(props){
  const [user_id,setUserId] = useState('');
  const [searchClicked,setSearchClicked] = useState(false);
  const [requestStatus,setReqStatus] = useState({isSuccess:false,message:''});
  function search(){
    setSearchClicked(true);
  }
  function handleChange(event){
    setSearchClicked(false);
    setReqStatus({isSuccess:false,message:''})
    setUserId(event.target.value);  
  }
  function deleteUser(){
    if(user_id){
      if(user_id===props.user_id){

          setReqStatus({isSuccess:false,message:'You cannot delete yourself!!Ask another admin to do so.'})
      }else{
      var url='http://localhost:8080/api/admin/user/'+user_id;
      fetch(url,{
          method:'DELETE',
          mode:'cors',
          credentials:'include',headers:{'Authorization':props.accessToken}})
          .then((response)=>{
            let p =response.json();
            if(!response.ok){
              p.then(data=>setReqStatus({isSuccess:false,message:data.message}));
            }else{
              p.then((data)=>{setReqStatus({isSuccess:true,message:data.status})});   
            }
        }).catch(e=>setReqStatus({isSuccess:false,message:'An error occurred :'+e.message}));
      }
    }
    else{
      setReqStatus({isSuccess:false,message:'No user id has been provided'})
    }
  }
  return (<div className="show-profile-wrapper overflow-hidden">
          <p className="red-text text-center">{requestStatus.message}</p>
          <p className="text-center">Search by user-id :</p>
          <input className="search-user-input" name="userid" type="text" onChange={handleChange} placeholder="Enter user-id here"/><br/>
          <button className="search-delete-user-button" onClick={search}>Search User</button><br/>
          {(searchClicked)?<><button className="search-delete-user-button" onClick={deleteUser}>Delete User</button><br/></>:null}
          {(searchClicked)?<ShowProfile user_id={user_id} accessToken={props.accessToken}/>:''} 
    </div>
    )
}
export default SearchProfile;