import Image from 'next/image'
import styles from './Detail.module.scss'
import { Genre } from 'app/types'
import { MenuDetail } from 'app/components/DetailsMedia/MenuDetail/MenuDetail';
import { Media } from 'app/components/DetailsMedia/Media/Media';
import { Review } from 'app/components/DetailsMedia/Review/Review';
import formatDate from 'app/utils';
import { Api } from 'app/hooks/Api';
import Credits from 'app/components/DetailsMedia/Credits/Credits';

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

              <h3 className={styles.vote}> {Math.floor(data.vote_average * 10)} </h3>

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
