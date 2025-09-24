'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import styles from './Home.module.css'
import { CarouselTrailerSkeleton } from 'app/components/TrailerCard/CarouselTrailerSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import Link from 'next/link'

const key = process.env.NEXT_PUBLIC_API_KEY;

type TrailerTab = 'popular' | 'streaming' | 'on-tv' | 'for-rent' | 'in-theater';

export default function Trailer(){

  const [activeTab, setActiveTab] = useState<TrailerTab>('popular');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const type = (activeTab === 'on-tv' || activeTab === 'popular') ? 'tv' : 'movie';

  useEffect(() => {
    
    const fetchTrailer = async () => {
      setLoading(true);
      setError(null);

      let url = '';

      switch(activeTab) {
        case 'popular':
          url = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc';
          break;
        case 'streaming':
          url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
          break;
        case 'on-tv':
          url = 'https://api.themoviedb.org/3/tv/on_the_air?page=1';
          break;
        case 'for-rent':
          url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&with_watch_monetization_types=rent';
          break;
        case 'in-theater':
          url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
          break;
        default: 
          url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
      }
    
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Falha na resposta da API');
        }
        const data = await response.json();

        const some = data.results.slice(0, 10);

        const trailers = some.map(async (item: any) => {
          const trailer_url = `https://api.themoviedb.org/3/${type}/${item.id}/videos`;

          const response_trailer = await fetch(trailer_url, options);
          if (!response_trailer.ok) {
              throw new Error('Falha na resposta da API');
          }
          const trailer_data = await response_trailer.json();

          const trailer = trailer_data.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

          const title = item.title || item.name;
          return trailer ? {...trailer, nametitle: title} : null;

        });

        const final_trailer = (await Promise.all(trailers)).filter(Boolean);
        setResults(final_trailer);

      }

      catch (err) {
        setError('Falha ao carregar.');
        console.error(err);
      }

      finally{
        setLoading(false);
      }
    } 

    fetchTrailer();

  }, [activeTab]);

  if (error) return <div>{error}</div>;

  return (
    <section className={styles.trailers}>
    
      <div className={styles.title}>
        <h2 className="font-semibold text-xl">Latest Trailers</h2>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TrailerTab)} >
            <TabsList className="bg-transparent">
              <TabsTrigger value="popular" className="bg-[#04203c] text-white data-[state=active]:bg-white data-[state=active]:text-[#04203c]">Popular</TabsTrigger>
              <TabsTrigger value="streaming" className="bg-[#04203c] text-white data-[state=active]:bg-white data-[state=active]:text-[#04203c]">Streaming</TabsTrigger>
              <TabsTrigger value="on-tv" className="bg-[#04203c] text-white data-[state=active]:bg-white data-[state=active]:text-[#04203c]">On Tv</TabsTrigger>
              <TabsTrigger value="for-rent" className="bg-[#04203c] text-white data-[state=active]:bg-white data-[state=active]:text-[#04203c]">For rent</TabsTrigger>
              <TabsTrigger value="in-theater" className="bg-[#04203c] text-white data-[state=active]:bg-white data-[state=active]:text-[#04203c]">In Theaters</TabsTrigger>
            </TabsList>
        
        </Tabs>

      </div>



      {loading ? (<CarouselTrailerSkeleton />) 
      
      : (
        <div className="pb-8">
            {results.length > 0 && (
              <div className={styles.tab}>
                {results.map(video => (
                  <div key={video.id} className={styles.videocard}>
                    <Link href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noopener noreferrer">
                
                      <Image
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        alt={video.name}
                        width={315}
                        height={176.96} 
                        style={{borderRadius: '8px', paddingBottom: '5px'}}
                      />

                      <div>
                        <h3 className="font-bold">{video.nametitle}</h3>
                        <h4 className="text-sm pb-4">{video.name}</h4>
                      </div>

                    </Link>
                  </div>
                ))}
              </div>
            )}

        </div>
      )}
    </section>
    );
}
