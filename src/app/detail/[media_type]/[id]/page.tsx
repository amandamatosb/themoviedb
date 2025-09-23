import Image from 'next/image'
import styles from './detail.module.scss'
import { Genre } from 'app/types'
import { MenuDetail } from 'app/components/details/MenuDetail/MenuDetail';
import { Media } from 'app/components/details/Media/Media';

export default async function detailPage ({ params } : { params : {id: string, media_type: 'movie' | 'tv' | 'person'}} ) {
  const id = params.id;
  const type = params.media_type;

  const url = `https://api.themoviedb.org/3/${type}/${id}`;
  const url_credits =  `https://api.themoviedb.org/3/${type}/${id}/credits`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGMxYzFiZDU3MzY2NTgyNjNjMzc0MWFiZmY1NGJmNCIsIm5iZiI6MTc1NzUyNzg0Mi4wNTksInN1YiI6IjY4YzFiZjIyYjRiNDc0MDAwYzFmNjNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Ir2TNtVmhW7IZR00ChUh7Y_JeZoy7-V71jE61mLRio'
    }
  }

  try {
    const response = await fetch(url, options);
    const response_credits = await fetch(url_credits, options);
    if (!response.ok || !response_credits.ok) {
            throw new Error('Falha na resposta da API');
        }

    const data = await response.json();
    const data_credits = await response_credits.json();
    const background = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

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
                    alt={`Pôster de ${data.title || data.name}`}
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
                { type === 'movie' && 
                <p>{data.release_date || data.first_air_date}</p>}
                <div>
                  {data.genres.map((genre: Genre) => (
                    <span key={genre.id}> {genre.name} </span>
                  ))} 
                </div>
                { type === 'movie' && 
                <div> {Math.floor(data.runtime / 60)}h {data.runtime % 60}m </div>}
              </div>

              <h3 className={styles.vote}> {Math.floor(data.vote_average * 10)} </h3>

              <p className={styles.tagline}>{data.tagline}</p>
              <h3 className={styles.overview}>Overview</h3>
              <p className={styles.overviewtext} >{data.overview}</p>

            </div>
          
          </div>
    
        </div>
      </section>

      <section className={styles.section_info}>
        <div className={styles.container_cast}>
          <h2 className={styles.title_cast}>Top Billed Cast</h2>
          <div className={styles.people}>
            {data_credits.cast.slice(0,10).map((actor: any) => (
              <div  key={actor.id} className={styles.card}>
                <Image src = {`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        width={140}
                        height={210}
                        className={styles.imgcast}
                        >
                </Image>

                <div className={styles.info}>
                  <p style={{fontSize: 'smaller', fontWeight: 'bold'}}>{actor.name}</p>
                  <p style={{fontSize: 'small'}}>{actor.character}</p>
                </div>

              </div>
              ))} 
          </div>
        </div>
      </section>

      <section className={styles.section_info}>
        <Media id={params.id} media_type={params.media_type} />
      </section>

      </>

    )
  }
  
  catch (err) {
    console.error(err);
    
    return <div>Falha ao carregar</div>
  }

}
