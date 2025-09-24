export type Movie = {
  id: number;
  title?: string;
  release_date?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  name?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv' | 'person';
  tagline: string;
};

export type Genre = {
  id: number;
  name: string;
}
