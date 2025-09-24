import React from 'react'
import styles from './Home.module.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Welcome = () => {
  return (
    <section className= {styles.welcome}>
        <h1 className="font-bold text-4xl" >Welcome.</h1>
        <h2 className="font-semibold text-2xl">Millions of movies, TV shows and people to discover. Explore now.</h2>

        <div className="pt-8 flex w-full items-center gap-2">
          <Input type="search" placeholder="Search for a movie, tv show, person... (ainda não funciona)" className='bg-white text-black'/>
          <Button type="submit" variant="outline" className='bg-[#0fc4c7]'>
            Search
          </Button>
      </div>

    </section>  
    
  )
}

export default Welcome