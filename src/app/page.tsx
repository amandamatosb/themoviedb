import Welcome from "./home/sections/Welcome";
import Join from "./home/sections/Join";
import Trailers from "./home/sections/Trailers";
import Trending from "./home/sections/Trending";
import Leaderboard from "./home/sections/Leaderboard";
import { Popular } from "./home/sections/Popular";
import styles from './home/sections/Home.module.css'
import { Suspense } from "react";
import { CarouselSkeleton } from "./components/MovieCard/CarouselSkeleton";

export default function Home() {
  return (
    <>
      < Welcome />
      <section className={styles.trending}>
        <h2 className="font-semibold text-xl">Trending</h2>
        <Suspense fallback = { <CarouselSkeleton /> }>
          <Trending />
        </Suspense>
      </section>
      < Trailers />
      < Popular />
      < Join />
      < Leaderboard />
    </>
  );
}
