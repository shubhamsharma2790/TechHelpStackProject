// import styles from styles folder
import '../styles/Home.css';
import {Link} from 'react-router-dom';
function Home() {
  return (
    <div className="home-content">
    	 <div className="home-banner">
          <h1 align="center">TECH HELP STACK</h1>
        </div>
    		<div className="home-navlink">
	      		<Link to="/signin">Sign In</Link>
	     	</div>
	     	<div className="home-navlink">
	      		<Link to="/signup">Sign Up</Link>
     		</div>

	     
    </div>
  );
}

export default Home;
