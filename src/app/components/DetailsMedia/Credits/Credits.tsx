import Image from "next/image";
import styles from './Credits.module.css'
const key = process.env.NEXT_PUBLIC_API_KEY;

export default async function Credits ({id, media_type} : {id: string; media_type: string}) {

    const url = `https://api.themoviedb.org/3/${media_type}/${id}/credits`;

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

        return (
            <div className={styles.container_cast}>
            <h2 className={styles.title_cast}>Top Billed Cast</h2>
            <div className={styles.people}>
            {data.cast.slice(0,10).map((actor: any) => (
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

        );
    }

    catch (err) {
        console.error(err);

        return <div>Falha ao carregar</div>
    }

}