import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {RootState}  from '../store/reducer.ts'
import moment from "moment";

type CardData = {
  id: number;
  title: string;
  name?: string; 
  overview?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  media_type?: string;
};

interface MoviesCardProps {
  data: CardData;
  heading?: string;
  trending?: boolean;
  media_type?: string;
  index: number;
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  data,
  trending,
  index,
  media_type,
}) => {
  const imageURL = useSelector((state: RootState) => state.movieoData.imageURL);

  const mediaType = media_type || data.media_type;

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all">
      {data.poster_path ? (
        <img
          src={`${imageURL}${data.poster_path}`}
          alt={data.title || data.name}
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white">
          No image found
        </div>
      )}

      {trending && (
        <div className="absolute top-4 py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60">
          #{index} Trending
        </div>
      )}

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data.title || data.name || "Untitled"}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          {data.vote_average !== undefined && (
            <p className="bg-black px-1 rounded-full text-xs text-white">
              Rating: {data.vote_average.toFixed(1)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MoviesCard;
