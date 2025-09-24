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
      <nav className="space-x-5 font-semibold flex flex-wrap">
        <Link href='/movies'>Movies</Link>
        <Link href='/tvshows'>TV Shows</Link>
        <Link href='/people'>People</Link>
        <Link href='/more'>More</Link>
        <Link href='/favorites'>Favorites</Link>
      </nav>
    </header>
  )
}

export default Header
