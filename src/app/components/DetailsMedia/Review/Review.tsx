'use client'

import {useState, useEffect} from 'react'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styles from './Review.module.scss'
import formatDate from 'app/utils'

type ReviewTab = 'reviews' | 'discussion';

const key = process.env.NEXT_PUBLIC_API_KEY;

export function Review ({id, media_type} : {id: string; media_type: string})
{
    const [results, setResults] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<ReviewTab>('reviews');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchMedia = async () => {
          setLoading(true);
          setError(null);
    
          let url = '';
          
          switch(activeTab) {
            case 'reviews':
              url = `https://api.themoviedb.org/3/${media_type}/${id}/reviews`;
              break;
            default: 
              url = `https://api.themoviedb.org/3/${media_type}/${id}/reviews`;
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

            setResults(data.results);
            
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
    <>
    <div className={styles.social}>
      <h1>Social</h1>

    <div className={styles.tabreview}>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ReviewTab)}>
        <TabsList className="bg-transparent">
          <TabsTrigger value="reviews" className= "data-[state=active]:bg-[#e7e7e7]">Reviews</TabsTrigger>
          <TabsTrigger value="discussions" className= "data-[state=active]:bg-[#e7e7e7]">Discussions</TabsTrigger>
        </TabsList>

        {!loading && !error && (
          <> 
            <TabsContent value="reviews">
                {results.length > 0 
                ? (
                <div className={styles.tab}>
                  {results.slice(0, 1).map(review => (
                    <div key={review.id}>
                      <div className={styles.author}>
                        A review by {review.author}
                      </div>
                      <div className={styles.sub}>
                        <div className={styles.rating}>
                          {review.author_details.rating * 10}%
                        </div>
                        <div className={styles.desc}>
                          Written by {review.author} on {formatDate(review.created_at)}
                        </div>
                      </div>
                      <div className={styles.content}>
                        {review.content}    
                      </div>
                    </div>
                  ))}
                </div>
                )

                : (
                  <div className={styles.content}>{`We don't have any reviews.`}</div>
                )
              }
            </TabsContent>

          <TabsContent value="discussions">
            <div>
                <div className={styles.author}>
                    Sem discussões
                </div>
                <div className={styles.content}>
                Não tem como buscar discussões pela API do TMDb
                </div>
            </div>

          </TabsContent>


          </>
        )}
             
      </Tabs>

      </div>
    </div>
      <div className={styles.more}>Read All Reviews</div>
      <hr className={styles.hr}/>
    </>
    );

}


