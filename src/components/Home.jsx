import React from 'react'
import { useNavigate } from 'react-router-dom';
import Pic from "../assets/homeBanner.png";

const Home = () => {

  const navigate = useNavigate();

  return (
    
    <div id="home" className="home-container relative h-[45.2vw] border-2 border-transparent">
      
      <div className="left-section relative z-20 h-auto mt-[12%] w-[37%] ml-[4.6%] font-[Poppins]">

        <h1 className="text-[3.5vw] font-bold text-[#544B4B]">Take a <br />moment to make a difference.</h1>
        <p className="text-[1.3vw] text-[#2A2525] mt-3">Join hands with us to support causes that matter. Find volunteer opportunities, contribute your skills, and create a lasting impact in your community.</p>

        <button className="register-btn bg-[#463E3E] text-white px-8 py-2 mt-[8%] text-[1.4vw] rounded-full cursor-pointer" onClick={() => navigate('/register')}>Register Now</button>

      </div>
      
      <img src={Pic} alt="banner" className="home-banner h-[45vw] absolute top-0 right-0 z-0" />
      
    </div>
    
  );
}

export default Home