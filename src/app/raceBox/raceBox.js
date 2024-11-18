import React from 'react';
import './racebox.css';

export default function RaceBox(props) {
    // console.log(props.image)
    return (
        <a 
        href={'../../pages/'+props.displayText+'-'+props.raceId} 
        >
            <div className='race-box'>
                <img src={props.image} alt="text"/>
                <div class="race-box-text">
                    <h1>{props.displayText}</h1>
                </div>
            </div>
        </a>
    )
}