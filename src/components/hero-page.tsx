import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlinePlayCircle,
  AiFillInfoCircle,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";
import Navigation from "../routes/navigation";
import { RootState } from "../store/reducer";

type BannerDataItem = {
  backdrop_path: string;
  title?: string;
  name?: string;
  overview?: string;
  vote_average?: number;
  popularity?: number;
  media_type?: string;
  id?: number;
};

const HeroPage = () => {
  const bannerData = useSelector(
    (state: RootState) => state.movieoData?.bannerData || []
  ) as BannerDataItem[];
  const imageURL = useSelector(
    (state: RootState) => state.movieoData?.imageURL || ""
  );

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  }, [bannerData]);

  const handlePrevious = useCallback(() => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  }, [bannerData]);

  useEffect(() => {
    if (bannerData.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [bannerData, handleNext]);

  return (
    <div className="relative h-screen text-white">
      <Navigation />

      {bannerData.length > 0 ? (
        <div className="min-w-full min-h-full overflow-hidden group transition-all absolute top-0">
          <img
            src={imageURL + bannerData[currentImage]?.backdrop_path}
            alt="banner"
            className="absolute top-0 left-0 w-full h-full object-cover -z-50"
            loading="lazy"
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
            aria-hidden="true"
          />
          <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex">
            <button
              onClick={handlePrevious}
              className="bg-white p-1 rounded-full text-xl z-10 text-black"
              aria-label="Previous banner">
              <AiFillCaretLeft />
            </button>
            <button
              onClick={handleNext}
              className="bg-white p-1 rounded-full text-xl z-10 text-black"
              aria-label="Next banner">
              <AiFillCaretRight />
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
            <div className="hero-bg2 bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
            <div className="w-full absolute bottom-20 max-w-md">
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
                    Rating:{" "}
                    {bannerData[currentImage]?.vote_average?.toFixed(1) ||
                      "N/A"}
                  </p>
                  <span>|</span>
                  <p>
                    Views:{" "}
                    {bannerData[currentImage]?.popularity?.toFixed(0) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex mt-8 select-none">
                <Link
                  to={`/${bannerData[currentImage]?.media_type}/${bannerData[currentImage]?.id}`}
                  className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center">
                  <AiOutlinePlayCircle className="w-6 h-6 mr-2 fill-black" />
                  Play
                </Link>
                <Link
                  to="/"
                  className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center">
                  <AiFillInfoCircle className="w-6 h-6 mr-2" />
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          No banners available
        </div>
      )}
    </div>
  );
};

export default HeroPage;
