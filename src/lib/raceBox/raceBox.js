import React from 'react';
import './racebox.css';
import Image from 'next/image';

export default function RaceBox({displayText, raceId, image}) {
    return (
        <a 
            href={'../../pages/'+displayText+'-'+raceId}
            >

            <div className='race-box'>
                <Image 
                    className="race-image"
                    src={image} 
                    alt="text" 
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px', maxWidth: '400px' }}
                />
                <div className="race-box-text">
                    <h1>{displayText}</h1>
                </div>
            </div>
        </a>
    )
}