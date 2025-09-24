'use client'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './VoteProgress.module.css'

export default function VoteProgressBar ({note} : {note: number}) {
    
    const percentage = Math.ceil(note * 10);

    return (
        <>
            <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`}
                styles={buildStyles({
                    textColor: '#fff',
                    pathColor: '#078bc7'
                })} 
                className={styles.text}
            />
        </>
    );
    

}