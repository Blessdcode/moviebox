import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movies/movies.reducers";
import axios from "axios";
import { useEffect } from "react";

import Home from "./pages/home.component";
import SignUp from "./pages/sign-up";
import Login from "./pages/login";
import DetailsPage from "./pages/details-page";
import ExplorePage from "./pages/explore-page";

function App() {
  const dispatch = useDispatch();
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");

      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path=":explore" element={<ExplorePage />} />
        <Route path=":explore/:id" element={<DetailsPage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
