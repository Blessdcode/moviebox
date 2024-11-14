import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlinePlayCircle,
  AiFillInfoCircle,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";

import Navigation from "../routes/navigation";
import { RootState } from "../store/reducer";

const HeroPage = () => {
  const bannerData = useSelector(
    (state: RootState) => state.movieoData?.bannerData
  );
  const imageURL = useSelector(
    (state: RootState) => state.movieoData?.imageURL
  );
  const [currentImage, setCurrentImage] = useState(0);
  console.log(bannerData, "banner");

  const handleNext = () => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [bannerData]);

  return (
    <div className="relative h-screen text-white">
      <Navigation />

      {bannerData.length > 0 && (
        <div className="min-w-full min-h-full overflow-hidden  group transition-all absolute  top-0">
          <img
            src={imageURL + bannerData[currentImage].backdrop_path}
            alt="banner"
            className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
            aria-hidden="true"
          />

          <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex">
            <button
              onClick={handlePrevious}
              className="bg-white p-1 rounded-full text-xl z-10 text-black">
              <AiFillCaretLeft />
            </button>
            <button
              onClick={handleNext}
              className="bg-white p-1 rounded-full text-xl z-10 text-black">
              <AiFillCaretRight />
            </button>
          </div>

          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
            <div
              className="hero-bg2 bg-gradient-to-b from-black via-transparent to-transparent 
						absolute w-full h-full top-0 left-0 -z-10"
            />
            <div className=" w-full absolute bottom-20 max-w-md ">
              <div className="max-w-2xl select-none">
                <h1 className="mt-4 text-6xl font-extrabold text-balance">
                  {bannerData[currentImage]?.title ||
                    bannerData[currentImage]?.name}
                </h1>
                <p className="text-ellipsis line-clamp-3 my-2">
                  {bannerData[currentImage]?.overview}
                </p>
                <div className="flex items-center gap-4">
                  <p>
                    Rating :{" "}
                    {Number(bannerData[currentImage].vote_average).toFixed(1)}+
                  </p>
                  <span>|</span>
                  <p>
                    View :{" "}
                    {Number(bannerData[currentImage].popularity).toFixed(0)}
                  </p>
                </div>
              </div>

              <div className="flex mt-8 select-none">
                <Link
                  to={
                    "/" +
                    bannerData[currentImage]?.media_type +
                    "/" +
                    bannerData[currentImage].id
                  }
                  className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center">
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
        </div>
      )}
    </div>
  );
};

export default HeroPage;
