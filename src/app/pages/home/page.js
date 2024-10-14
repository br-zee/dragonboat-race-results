"use client";
import { useRaces } from "@/app/useRaces"
import { useEffect } from "react";
import { supabase } from "@/app/lib/stores/supabase";
import RaceBox from "@/app/raceBox/raceBox"
import './home.css';
import '../../globals.css' 

export default function Home() {

  const { races, setRaces, getRaces, subscribeToRaces } = useRaces();

    useEffect(() => {
        if (races[0].max < 1) {
            getRaces();
            subscribeToRaces();
        }
    }, [races])

    useEffect(() => {
        if (races[0].max >= 1) {
            setRaces([]);
          }
        subscribeToRaces();
    }, [supabase])

    return ( 
        <>
        <h1 className='header'> NCIDBF Race History</h1>
        <div className="race-display">
            {races.map((race, i) => {
                console.log(race.display)
                if (race.display != false) {
                    return (
                        <RaceBox key={'race_' + i}
                            displayText={race.raceName}
                            raceId={race.raceId}
                        />
                    )
                }
            })}   
        </div>
        </>        
    )
    
}