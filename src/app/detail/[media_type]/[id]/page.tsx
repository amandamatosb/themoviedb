import Image from 'next/image'
import styles from './Detail.module.scss'
import { Genre } from 'app/types'
import { MenuDetail } from 'app/components/DetailsMedia/MenuDetail/MenuDetail';
import { Media } from 'app/components/DetailsMedia/Media/Media';
import { Review } from 'app/components/DetailsMedia/Review/Review';
import formatDate from 'app/utils';
import Credits from 'app/components/DetailsMedia/Credits/Credits';
import VoteProgressBar from 'app/components/VoteProgressBar/VoteProgressBar';
import ButtonFavorite from 'app/components/ButtonFavorites/ButtonFavorite';
import Link from  'next/link';

const key = process.env.NEXT_PUBLIC_API_KEY;

export default async function detailPage ({ params } : { params : {id: string, media_type: 'movie' | 'tv' | 'person'}} ) {
  const { id, media_type } = await params;

  const url = `https://api.themoviedb.org/3/${media_type}/${id}`;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${key}`
    }
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
            throw new Error('Falha na resposta da API');
        }

    const data = await response.json();

    const background = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
 
    const trailer_url = `${url}/videos`;

    const response_trailer = await fetch(trailer_url, options);
    if (!response_trailer.ok) {
        throw new Error('Falha na resposta da API');
    }
    const trailer_data = await response_trailer.json();

    const trailer = trailer_data.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

    const play_trailer = `https://www.youtube.com/watch?v=${trailer.key}`;

    return (
        <>
        <section className={styles.section}>

          <MenuDetail />
          
          <div className={styles.detail}>
          <div className={styles.bg} style={{backgroundImage: `url(${background})`}} >
          </div>

          <div className={styles.container}>
            <div className={styles.image}>
              <Image src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={`${data.title || data.name}`}
                    width={300}
                    height={450}
                    style={{borderRadius: '10px', objectFit: 'cover'}}>
              </Image>
            </div>

            <div className={styles.text}>
              <div className={styles.title}>
                <h1> {data.title  || data.name} </h1> 
                <h2> ({new Date(data.release_date || data.first_air_date).getFullYear()}) </h2>
              </div>

              <div className={styles.subtitle}>
                { media_type === 'movie' && 
                <p>{formatDate(data.release_date) || formatDate(data.first_air_date)}</p>}
                <div>
                  {data.genres.map((genre: Genre) => (
                    <span key={genre.id}> {genre.name} </span>
                  ))} 
                </div>
                { media_type === 'movie' && 
                <div> {Math.floor(data.runtime / 60)}h {data.runtime % 60}m </div>}
              </div>

              <div className={styles.progress}>
                <div className={styles.circle}>
                 < VoteProgressBar note={data.vote_average} />
                </div>
                <div>
                    <div>User</div>
                    <div>Score</div>
                </div>
            </div>

              <div className={styles.buttons}>
                <div className={styles.buttonsgroup}>
                  <Image src="/list.svg" width={30} height={30} alt="List"/>
                  <ButtonFavorite movie={data} />
                  <Image src="/save.svg" width={30} height={30} alt="Save"/>
                </div>
                <div className={styles.trailer}>
                  <Link href={play_trailer} className={styles.link_trailer}>
                    <Image src="/play.svg" width={20} height={20} alt="Trailer"/>
                    Play Trailer
                  </Link>
                </div>
              </div>

              <p className={styles.tagline}>{data.tagline}</p>
              <h3 className={styles.overview}>Overview</h3>
              <p className={styles.overviewtext} >{data.overview}</p>

            </div>
          
          </div>
    
        </div>
      </section>

      <section className={styles.section_info}>
        <Credits id={id} media_type={media_type} />
      </section>

      <section className={styles.section_info}>
        <Review id={id} media_type={media_type} />
      </section>


      <section className={styles.section_info}>
        <Media id={id} media_type={media_type} />
      </section>

      </>

    )
  }
  
  catch (err) {
    console.error(err);
    
    return <div>Falha ao carregar</div>
  }

}
