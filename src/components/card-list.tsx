import { useRef } from "react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import MoviesCard from "./cards";

type CardData = {
  id: number;
  title: string;
  overview?: string;
  posterPath?: string;
};

interface CardListProps {
  data: CardData[];
  heading: string;
  trending?: boolean;
  media_type?: string;
}

const CardList: React.FC<CardListProps> = ({
  data = [],
  heading,
  trending,
  media_type,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrevious = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className=" relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none">
          {data.map((data, index) => {
            return (
              <MoviesCard
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10">
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10">
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardList;
