/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import CardList from "../components/card-list";
import { RootState } from "../store/reducer";
import useFetch from "../hooks/useFetch";

// Define types for movie details, cast, and crew
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

  // Fetch movie details and cast data with proper types
  const { data }: { data: MovieDetails | undefined } = useFetchDetails(
    `/${params?.explore}/${params?.id}`
  );
  const {
    data: castData,
  }: { data: { crew: CrewMember[]; cast: CastMember[] } | undefined } =
    useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = useCallback((id: string) => {
    setPlayVideoId(id);
    setPlayVideo(true);
  }, []);

  console.log(playVideo, playVideoId);

  const formatRuntime = (runtime?: number) =>
    runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : "N/A";

  // Destructure the movie details data safely with fallback to default values
  const {
    backdrop_path = "",
    poster_path = "",
    title = "",
    name = "",
    tagline = "No Tagline",
    vote_average = 0,
    vote_count = 0,
    runtime = 0,
    status = "Unknown",
    release_date = "",
    revenue = 0,
    overview = "No overview available",
  } = data || {};

  // Destructure the cast and crew data
  // const writer =
  //   castData?.crew
  //     ?.filter((el: CrewMember) => el.job === "Writer")
  //     ?.map((el) => el.name)
  //     ?.join(", ") || "Unknown";

  return data ? (
    <div>
      {/* Banner */}
      <div className="w-full h-[580px] relative hidden lg:block">
        <img
          src={`${imageURL}${backdrop_path}`}
          alt={`${title || name} backdrop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-3 py-16 lg:flex lg:gap-10">
        <Link
          to="/"
          className="absolute md:bg-green rounded-lg text-xl md:p-3 p-1 left-8 top-2 cursor-pointer md:hover:bg-orange z-50">
          {" "}
          &lt;Go Back{" "}
        </Link>
        {/* Poster */}
        <div className="relative lg:-mt-28">
          <img
            src={`${imageURL}${poster_path}`}
            alt={`${title || name} poster`}
            className="h-full md:h-80 w-full md:w-72 object-cover rounded"
          />
          <button
            onClick={() =>
              handlePlayVideo((data as MovieDetails).id.toString())
            }
            aria-label="Play Video"
            className="mt-3 w-full py-2 bg-white text-black rounded hover:bg-gradient-to-l from-red-500 to-orange-500">
            Play Now
          </button>
        </div>

        {/* Overview */}
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {title || name}
          </h2>
          <p className="text-neutral-400">{tagline}</p>

          <div className="flex gap-3 text-neutral-400">
            <p>Rating: {vote_average?.toFixed(1)}</p>
            <span>|</span>
            <p>Votes: {vote_count}</p>
            <span>|</span>
            <p>Runtime: {formatRuntime(runtime)}</p>
          </div>

          <p>Status: {status}</p>
          <p>
            Release Date:{" "}
            {release_date
              ? format(new Date(release_date), "MMMM do yyyy")
              : "N/A"}
          </p>
          <p>Revenue: ${revenue?.toLocaleString() || "N/A"}</p>
          <p>Overview: {overview}</p>
          <ul className="text-neutral-400 flex items-center gap-2">
            <p>Cast:</p>
            {castData?.cast.map((member: string) => (
              <li key={member.name}>{member.name}</li>
            )) || <li>No Cast Available</li>}
          </ul>
        </div>
      </div>

      {/* Cast and Recommendations */}
      <div>
        <CardList
          data={similarData}
          heading={`Similar ${params.explore}`}
          media_type={params.explore}
        />
        <CardList
          data={recommendationData}
          heading={`Recommendations`}
          media_type={params.explore}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default DetailsPage;
