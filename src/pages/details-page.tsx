import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import CardList from "../components/card-list";
import { RootState } from "../store/reducer";

interface CrewMember {
  job: string;
  name: string;
}

interface CastMember {
  name: string;
  profile_path: string;
}

interface MovieDetails {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  status?: string;
  release_date?: string;
  revenue?: number;
  overview?: string;
  crew?: CrewMember[];
  cast?: CastMember[];
}

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state: RootState) => state.movieoData.imageURL);
  const { data }: { data: MovieDetails | null } = useFetchDetails(
    `/${params?.explore}/${params?.id}`
  );
  const {
    data: castData,
  }: { data: { cast: CastMember[]; crew: CrewMember[] } | null } =
    useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (id: string) => {
    setPlayVideoId(id);
    setPlayVideo(true);
  };

  const duration = data?.runtime
    ? [Math.floor(data.runtime / 60), data.runtime % 60]
    : ["0", "0"];
  const writer = castData?.crew
    ?.filter((el) => el.job === "Writer")
    .map((el) => el.name)
    .join(", ");

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          {data?.backdrop_path && (
            <img
              src={`${imageURL}${data.backdrop_path}`}
              className="h-full w-full object-cover"
              alt="Backdrop"
            />
          )}
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          {data?.poster_path && (
            <img
              src={`${imageURL}${data.poster_path}`}
              className="h-80 w-60 object-cover rounded"
              alt="Poster"
            />
          )}
          <button
            onClick={() => handlePlayVideo(data?.id.toString() || "")}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all">
            Play Now
          </button>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <div className="flex items-center gap-3">
            <p>Rating : {data?.vote_average?.toFixed(1)}+</p>
            <span>|</span>
            <p>View : {data?.vote_count}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>

            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {data?.release_date
                  ? moment(data.release_date).format("MMMM Do YYYY")
                  : "N/A"}
              </p>
              <span>|</span>
              <p>Revenue : ${data?.revenue?.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <p>
              <span className="text-white">Director</span> :{" "}
              {castData?.crew.find((member) => member.job === "Director")?.name}
            </p>

            <p>
              <span className="text-white">Writer</span> : {writer || "N/A"}
            </p>
          </div>

          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starCast) => (
                <div key={starCast.name}>
                  <img
                    src={`${imageURL}${starCast.profile_path}`}
                    className="w-24 h-24 object-cover rounded-full"
                    alt={starCast.name}
                  />
                  <p className="font-bold text-center text-sm text-neutral-400">
                    {starCast.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <CardList
          data={similarData}
          heading={`Similar ${params.explore}`}
          media_type={params.explore}
        />
        <CardList
          data={recommendationData}
          heading={`Recommendation ${params.explore}`}
          media_type={params.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
