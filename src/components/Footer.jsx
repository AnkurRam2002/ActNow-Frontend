import React from 'react'
import { useNavigate } from 'react-router-dom';
import LogoFooter from "../assets/LogoFooter.png";
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaPhone, FaTwitter } from 'react-icons/fa';

const Footer = () => {

  const navigate = useNavigate();

  const handleScroll = (id) => { //scrolls to specific section on clicking from nav
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <div className='bg-[#463E3E] h-[24vw]'>
      <div className='flex justify-center py-[1%]'>
        <img src={LogoFooter} alt="" className='w-[13%]' />
      </div>
      
      <div className='flex justify-between items-start border-t border-[#b6b6a4] mx-[5%] pt-[2%] px-[1%] font-[Poppins] text-white'>
        <div>
          <p className='font-semibold mb-[10%] text-[1.1vw]'>Reach us</p>
          <div className='text-[1vw] font-light flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <FaPhone />
              <p>+91 12345 67890</p>
            </div>
            <div className='flex items-center gap-3'>
              <FaEnvelope />
              <p>abc123@email.com</p>
            </div>
            <div className='flex items-center gap-3'>
              <FaGlobe />
              <p>www.actnow.com</p>
            </div>
          </div>
        </div>
        <div>
          <p className='font-semibold mb-[10%] text-[1.1vw]'>Quick Links</p>
          <div className='text-[1vw] font-light flex flex-col gap-[0.7vw]'>
            <p className='cursor-pointer hover:underline' onClick={() => handleScroll('home')}>Home</p>
            <p className='cursor-pointer hover:underline' onClick={() => handleScroll('about')}>About</p>
            <p className='cursor-pointer hover:underline' onClick={() => handleScroll('services')}>Services</p>
            <p className='cursor-pointer hover:underline' onClick={() => handleScroll('contact')}>Contact</p>
          </div>
        </div>
        <div>
          <p className='font-semibold mb-[10%] text-[1.1vw]'>Legal</p>
          <div className='text-[1vw] font-light flex flex-col gap-[0.7vw]'>
            <p className='cursor-pointer hover:underline'>Privacy Policy</p>
            <p className='cursor-pointer hover:underline'>Terms & Services</p>
            <p className='cursor-pointer hover:underline'>Terms of Use</p>
          </div>
        </div>
        <div className=' bg-[#635858] rounded-lg px-[0.9vw] pr-[0.5vw] py-[0.5vw] flex items-center gap-[0.7vw]'>
          <p className='font-semibold text-[1.1vw]'>Follow Us</p>
          <div className='flex justify-center gap-[0.8vw] bg-[#463E3E] rounded-lg p-[0.7vw] text-[1vw]'>
            <FaTwitter className='cursor-pointer' />
            <FaInstagram className='cursor-pointer' />
            <FaFacebook className='cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer