import React from 'react'
import styles from "./Header.module.css" 
import Link from 'next/link'

const Header = () => {
  return (
    <header className= {styles.header} >
      <Link href='/.'>
          <img src="/tmdb_header_icon.svg" alt="" className="w-38 h-auto" />
      </Link>
      <nav className="space-x-5 font-semibold">
        <Link href='/movies'>Movies</Link>
        <Link href='/tvshows'>TV Shows</Link>
        <Link href='/people'>People</Link>
        <Link href='/more'>More</Link>
      </nav>
    </header>
  )
}

export default Header
