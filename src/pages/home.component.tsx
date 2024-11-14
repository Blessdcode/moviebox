import { useSelector } from "react-redux";

import CardList from "../components/card-list";
import HeroPage from "../components/hero-page";
import useFetch from "../hooks/useFetch";
import { RootState } from "../store/reducer";

const Home = () => {
  const trendingData = useSelector((state:RootState) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: onTheAirShowData } = useFetch("/tv/on_the_air");
  return (
    <div>
      <HeroPage />
      <CardList data={trendingData} heading={"Trending"} trending={true} />
      <CardList data={nowPlayingData} heading={"Now Playing"} trending={true} />
      <CardList data={onTheAirShowData} heading={"On The Air"} trending={true} />
      <CardList data={topRatedData} heading={"Top Rated Movies"} trending={true} />
      <CardList data={popularTvShowData} heading={"Popular Tv Show"} trending={true} />
    </div>
  );
};

export default Home;
