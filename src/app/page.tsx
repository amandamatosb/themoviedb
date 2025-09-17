import Welcome from "./home/sections/Welcome";
import Join from "./home/sections/Join";
import Trailers from "./home/sections/Trailers";
import Trending from "./home/sections/Trending";
import Leaderboard from "./home/sections/Leaderboard";
import Popular from "./home/sections/Popular";
import FreeWatch from "./home/sections/FreeWatch";
import styles from './home/sections/Home.module.css'
import { Suspense } from "react";
import { CarouselSkeleton } from "./components/MovieCard/CarouselSkeleton";

export default function Home() {
  return (
    <>
      < Welcome />
      <Trending />
      < Trailers />
      < Popular />
      < FreeWatch />
      < Join />
      < Leaderboard />
    </>
  );
}
