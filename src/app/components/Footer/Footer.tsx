import React from 'react'
import styles from "./Footer.module.css"
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container_join}>
        <img src="/tmdb_footer_icon.svg" alt="" className="ml-18 mb-10 w-33 h-auto" />
        <Link href="/join">
          <h2>JOIN THE COMMUNITY</h2>
        </Link>
      </div>
      <div className={styles.container}>
        <h2>THE BASICS</h2>
        <p>About TMDB</p>
        <p>Contact Us</p>
        <p>Support Forms</p>
        <p>API Documentation</p>
        <p>System Status</p>
      </div>
      <div className={styles.container}>
        <h2>GET INVOLVED</h2>
        <p>Contribution Bible</p>
        <p>Add New Movie</p>
        <p>Add New Tv Show</p>
      </div>
      <div className={styles.container}>
        <h2>COMMUNITY</h2>
        <p>Guidelines</p>
        <p>Discussions</p>
        <p>Leaderboard</p>
      </div>
      <div className={styles.container}>
        <h2>LEGAL</h2>
        <p>Terms of Use</p>
        <p>API Terms of Use</p>
        <p>Privacy Policy</p>
        <p>DMCA Policy</p>
      </div>
    </footer>
  )
}

export default Footer