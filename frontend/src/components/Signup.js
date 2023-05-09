import React,{useState} from 'react'
import {auth} from './Firebase'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'
import logo from './leaf.png'



const Signup = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/login');
  };
  const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
  })
  const {username,email,password}=data;
  const changeHandler=e=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const Signup=e=>{
    if(data.password.length<8){
      window.alert("Password must have atleast 8 characters");
    }
    else{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email,password).then(user=>navigate('/home')
      ).catch(err=>console.log(err));
      window.alert("Registered Successfully.")
    }
  }
  const [passwordType, setPasswordType] = useState("password");
  const showPassword =(e)=>{
    e.preventDefault();
    if(passwordType==="password")
    {
     setPasswordType("text")
    }
    else{
      setPasswordType("password")
    }
  }
  return (
      <div>
        <header>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-2 pb-1 navbar-fixed-top">
      <div className="container">
        <div className="nav-item float-start">
          <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
          <li><img src={logo} height={30} width={30} /></li>&nbsp;&nbsp;
                <li> <h5 className="text-light">Blight Vision</h5></li>
          </ul>
          </div>
        </div>
        <div className="nav-item float-end">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto px-3">
            <li><h5><Link to="/" className="nav-item nav-link btn btn-dark">Home</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/login" className="nav-item nav-link btn btn-dark">Login</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/signup" className="nav-item nav-link btn btn-dark">Sign up</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </header>
    <div className="container ">
    <br /><br /><br />
    <div className="row px-3 justify-content-center">
    <div className="col-sm-4 rounded" >
    <section className='login' id='login'>
  <div className='head'>
  <h3 className='company'>Sign Up</h3>
  </div>
  <div className='form'>
    <br/>
    <form style={{height:"295px"}}>
    <input autoComplete='off'  type="text" className='text' placeholder='UserName' value={username} name='username' onChange={changeHandler} />
    <input  type="text" placeholder='Email id' className='text1' value={email} name='email' onChange={changeHandler}/><br/>
    <input autoComplete='off' type={passwordType} className='password' placeholder='Password : atleast 8 characters' value={password} name='password' onChange={changeHandler}/>&nbsp;&nbsp;&nbsp;
    <button className="btn btn-sm btn-outline-light" onClick={showPassword}>
      { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
    </button>
    <br/><br/>
    <div className='justify-content-center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button onClick={Signup} className='btn btn-outline-light'>SignUp</button><br/><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><small>Have an Account? <a className='text-light' href="#"  onClick={navigateLogin}>LogIn</a></small></span>
    </div>
    </form>
  </div>
</section>
</div>
    </div>
  </div>
      </div>
    )
}

export default Signup
