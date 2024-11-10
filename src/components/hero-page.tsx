import { heroBanner } from "../assets";

const HeroPage = () => {
  return (
      <div className=" relative">
          <div className="w-full absolute">
              
      <img src={heroBanner} alt="banner" className="w-[100%] object-cover absolute"/>
          </div>
    </div>
  );
};

export default HeroPage;
