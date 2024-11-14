import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/cards";

interface ExploreData {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  overview?: string;
}

const ExplorePage: React.FC = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState<ExploreData[]>([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: { page: pageNo },
      });
      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {params.explore} show
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData) => (
            <Cards
              key={exploreData.id}
              data={exploreData}
              media_type={params.explore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
