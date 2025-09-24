import React from 'react'
import styles from "./Header.module.css" 
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className= {styles.header} >
      <Link href='/.'>
        <Image src="/tmdb_header_icon.svg" alt=""
        width={273.42} height={35.52} 
        style={{width: '152px', height: 'auto',}}></Image>
      </Link>

      <nav className="font-semibold flex flex-wrap">
        <div className={styles.bar}>
          <div>Movies</div>
          <div>TV Shows</div>
          <div>People</div>
          <div>More</div>
        </div>
        
        <div className ="space-x-5 font-semibold flex flex-wrap">
          <Link href='/favorites' className='text-left text-yellow-200'>Favorites</Link>
          <Image src="/plus.svg" width={20} height={20} alt="plus"/>
          <Image src="/language.svg" width={20} height={20} alt="language"/>
          <div>Login</div>
          <div>Join TMDB</div>
          <Image src="/search.svg" width={20} height={20} alt="len"/>
        </div>
      </nav>

   
    </header>
  )
}

export default Header
