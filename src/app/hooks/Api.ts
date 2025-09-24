const key = process.env.NEXT_PUBLIC_API_KEY;

import {useState, useEffect} from 'react'
import type { Movie } from 'app/types';

export function Api(url: string){

  const [data, setData] =  useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if(!url) return;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

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
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setData(Array.isArray(data.results) ? data.results : []);
      }

      catch (err) {
        setError('Falha ao carregar.');
        console.error(err);
      }

      finally{
        setLoading(false);
      }
    } 

    fetchData();

  }, [url]);

  return {data, loading, error};
}
