import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { NavLinks } from "../data";
import { logo } from "../assets";
import styles from "../styles";

const Navigation = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`w-full flex py-3 md:py-6 px-5 md:px-0 justify-between items-center navbar ${styles.boxWidth} relative z-50 `}>
      {/* Logo */}
      <Link className="" to={"/"}>
        <img src={logo} alt="logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 capitalize">
        {NavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-White"
            } ${index === NavLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}>
            <a href={`${nav.link}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="ml-10 bg-green p-3 rounded-md cursor-pointer">
        <Link to={"/sign-up"}>Sign up</Link>
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div className="" onClick={() => setToggle(!toggle)}>
          {toggle ? <AiOutlineClose size={36} /> : <AiOutlineMenu size={30} />}
        </div>

        {/* Sidebar */}
        <div
          className={`${
            !toggle ? "hidden" : "flex "
          } p-6 bg-dimWhite absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl transition-all`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col capitalize">
            {NavLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-cursive text-end font-medium cursor-pointer text-[18px] ${
                  active === nav.title ? "text-white" : "text-darkBlack"
                } ${index === NavLinks.length - 1 ? "mb-0" : "mb-3"}`}
                onClick={() => setActive(nav.title)}>
                <a href={`${nav.link}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
