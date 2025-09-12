import Welcome from "./home/sections/Welcome";
import Join from "./home/sections/Join";
import Trailers from "./home/sections/Trailers";
import Trending from "./home/sections/Trending";
import Leaderboard from "./home/sections/Leaderboard";
import { Popular } from "./home/sections/Popular";

export default function Home() {
  return (
    <>
      < Welcome />
      < Trending />
      < Trailers />
      < Popular />
      < Join />
      < Leaderboard />
    </>
  );
}
