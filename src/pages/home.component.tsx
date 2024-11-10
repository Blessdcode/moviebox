import { Link } from "react-router-dom";
import { AiOutlinePlayCircle, AiFillInfoCircle } from "react-icons/ai";

import { heroBanner } from "../assets";
import Navigation from "../routes/navigation";

const Home = () => {
  return (
    <div className=" relative h-screen text-white">
      <Navigation />

      <img
        src={heroBanner}
        alt="banner"
        className="absolute top-0 left-0 w-full h-full object-cover -z-50"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
        <div
          className="hero-bg2 bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10"
        />

        <div className="max-w-2xl select-none">
          <h1 className="mt-4 text-6xl font-extrabold text-balance">
            The Witcher
          </h1>
          <p className="mt-2 text-lg">
            Geralt of Rivia, a mutated monster-hunter for hire, journeys toward
            his destiny in a turbulent world where people often prove more
            wicked than beasts
          </p>
        </div>

        <div className="flex mt-8 select-none">
          <Link
            to={"/"}
            className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center">
            <AiOutlinePlayCircle className="size-6 mr-2 fill-black" />
            Play
          </Link>

          <Link
            to={"/"}
            className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center">
            <AiFillInfoCircle className="size-6 mr-2" />
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
