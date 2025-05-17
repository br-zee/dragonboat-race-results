"use client";
import { useRaces } from "@/hooks/useRaces"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/stores/supabase";
import RaceBox from "@/lib/raceBox/raceBox"
import './home.css';
import '../../globals.css' 

export default function Home() {

  const { races, setRaces, getRaces, subscribeToRaces } = useRaces();
  const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        getRaces();
        subscribeToRaces();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (races[0].max >= 1) {
            setRaces([]);
          }
        subscribeToRaces();
    }, [supabase])

    return ( 
        <>
        <h1 className='header'>CDBA Race History</h1>
        <div className="race-display">
            {
                isLoading
                    ? <p style={{textAlign: 'center'}}>Loading races...</p>
                    : 
                    races.map((race, i) => {
                        if (race.display != false) {
                            return (
                                <RaceBox key={'race_' + i}
                                    displayText={race.raceName}
                                    raceId={race.raceId}
                                    image={race.imageId != null ? 'https://drive.google.com/thumbnail?id='+race.imageId+'&sz=w1000' : '/static/TEMP_IMAGE.png'}
                                />
                            )
                        }
                    })
            }
        </div>
        </>        
    )
    
}