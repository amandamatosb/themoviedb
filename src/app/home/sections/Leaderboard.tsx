import React from 'react'
import styles from './Home.module.css'
import { mockLeaderboard } from 'app/mock/mockLeaderBoard'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"

const Leaderboard = () => {
  return (
    <section className= {styles.leaderboard}>
        <h2 className="font-semibold text-xl mb-5">Leaderboard</h2>
        <div className={styles.leaderboardcontainer}>
          {
          mockLeaderboard.map((user, index) => 
            <div key={index} className={styles.infoleaderboard}>
              <div>
                <Image src={user.avatar} 
                        width={56} height={56}
                        alt={user.username}
                        className="rounded-full" 
                />
              </div>
              <div className={styles.leaderinfo}>
                {user.username}
                <div>
                  <div className={styles.progress}>
                    <Progress className="bg-transparent" value={user.points_green} />
                    {user.points_green}
                  </div>
                  <div className={styles.progress}>
                    <Progress className="bg-transparent" value={user.points_red} />
                    {user.points_red}
                  </div>
                </div>
              </div>
            </div>
        )}
        </div>
      </section> 
  )
}

export default Leaderboard