import React from "react";
import Logo from "../assets/Logo.png";
import Nav from "./Nav";

const Header = () => { //Header contains logo and nav bar
  return (
    <div className="header absolute flex h-[5vw] w-full z-20 justify-between items-center pr-[5%] pl-[3%] mt-[1%]">

      <div className="left-section h-full">
        <img src={Logo} alt="ActNow" className="logo h-full" />
      </div>

      <div className="right-section h-full flex w-[47%]">
        <Nav />
      </div>

    </div>
  );
}

export default Header;
