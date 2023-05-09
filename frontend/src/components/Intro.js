import React,{useState,useRef} from 'react'
import logo from './leaf.png'
import img from './logo.png'
import video from './video.mp4'
import { Link } from 'react-router-dom'

const Intro = () => {
  return (
<div>
<video className='videoTag' autoPlay loop muted>
  <source src={video} type="video/mp4" />
</video>
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
          <ul className="navbar-nav">
            <li><h5><Link to="/" className="nav-item nav-link btn btn-dark">Home</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/home" className="nav-item nav-link btn btn-dark">Login</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/signup" className="nav-item nav-link btn btn-dark">Sign up</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </ul>
        </div>
      </div>
    </div>
  </nav>
</header>
<div className="container">
  {/* <br /><br /><br /><br /><br /><br/><br/> */}
  <div className="row px-3 ">
    <div className="col-sm-3 overlay">
      <div className="card">
        <img className="card-img-overlay rounded img-thumbnail centered1" style={{backgroundColor: 'rgba(245, 245, 245, 0.3)'}} src={img} alt="Blight-Vision" width="277px" height="295px" />
      </div>
    </div>
  </div>
</div>
<div className='overlay'>
<div className="centered2"><font face="Verdana"size={4} color="white">Welcome To Blight Vision,</font><br /><font face="Times New Roman" size={5} color="white">This is a Machine Learning based project that aims to detect the presence<br/> of late blight or early blight on potato leaves, which are the primary causes of <br/> crop damage. Using computer vision techniques, Blight Vision analyzes images <br/> of potato leaves and provides a quick and accurate diagnosis of the presence of blight.<br/> Additionally, the system recommends appropriate precautions and pesticides to help farmers eliminate the blight and protect their crops. With Blight Vision, farmers can quickly detect blight and take action before it spreads, potentially saving their crops and increasing their yields.</font></div>
    <a href="https://maheshkumarkottakota.netlify.app/" target="_blank"><button className="but1"><small>Developer Info</small></button></a>
</div>
</div>
  )
}

export default Intro
