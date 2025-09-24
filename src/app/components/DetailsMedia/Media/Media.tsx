'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import styles from './Media.module.scss'
import Link from 'next/link'

type MediaTab = 'videos' | 'backdrops' | 'posters';

type Media = {
    file_path: string;
};

const key = process.env.NEXT_PUBLIC_API_KEY;

export function Media ({id, media_type} : {id: string; media_type: string})
{

    const [results, setResults] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<MediaTab>('videos');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchMedia = async () => {
          setLoading(true);
          setError(null);
    
          let url = '';
          
          switch(activeTab) {
            case 'videos':
              url = `https://api.themoviedb.org/3/${media_type}/${id}/videos`;
              break;
            case 'backdrops':
            case 'posters':
              url = `https://api.themoviedb.org/3/${media_type}/${id}/images`;
              break;
            default: 
              url = `https://api.themoviedb.org/3/${media_type}/${id}/videos`;
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

            if (activeTab === 'videos') {
              setResults(data.results || []);
            } 
              
            else if (activeTab === 'backdrops') {
              setResults(data.backdrops || []); 
            } 
                
            else if (activeTab === 'posters') {
              setResults(data.posters || []);  
            }

            
          }
    
          catch (err) {
            setError('Falha ao carregar.');
            console.error(err);
          }
    
          finally{
            setLoading(false);
          }
        } 
    
        fetchMedia();
    
      }, [activeTab, id, media_type]);

  return (
    <div className={styles.media}>
      <h1>Media</h1>

    <div className={styles.tabmedia}>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MediaTab)}>
        <TabsList className="bg-transparent">
          <TabsTrigger value="videos" className= "data-[state=active]:bg-[#e7e7e7]">Videos</TabsTrigger>
          <TabsTrigger value="backdrops" className= "data-[state=active]:bg-[#e7e7e7]">Backdrops</TabsTrigger>
          <TabsTrigger value="posters" className= "data-[state=active]:bg-[#e7e7e7]">Posters</TabsTrigger>
        </TabsList>

        {!loading && !error && (
          <> 
          <TabsContent value="videos">
              {results.length > 0 && (
              <div className={styles.tab}>
                {results.map(video => (
                  <div key={video.id} className={styles.videocard}>
                    <Link href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noopener noreferrer">
                
                      <Image
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        alt={video.name}
                        width={320}
                        height={180} 
                        style={{borderRadius: '8px', paddingBottom: '5px'}}
                      />
                      {video.name} 

                    </Link>
                  </div>
                ))}
              </div>
              )}
          </TabsContent>

          <TabsContent value="backdrops">
            {results.length > 0 && (
              <div className={styles.tab}>
                {results.map((image: Media) => ( 
                  <Image
                    key={image.file_path}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt="Backdrop"
                    width={391}
                    height={220}

                  />
                ))}
              </div>
            )}

          </TabsContent>

            <TabsContent value="posters">
                {results.length > 0 && (
                  <div className={styles.tab}>
                    {results.map((image: Media) => ( 
                      <Image
                        key={image.file_path}
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt="Poster"
                        width={150}
                        height={225} 
                      />
                    ))}
                  </div>
                )}
            </TabsContent>
          </>
        )}
             
      </Tabs>
      </div>
    </div>
    );

}


