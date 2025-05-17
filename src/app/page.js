"use client";
import { useRaces } from '../hooks/useRaces';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/stores/supabase';
import { useRaceInstance } from '@/hooks/useRaceInstance';

import RaceData from '@/lib/RaceData/RaceData';

export default function Landing() {

  const { race, getCurrentRace } = useRaces();
  const [ title, setTitle ] = useState("");
  const [ raceId, setRaceId ] = useState(null);

  useEffect(() => {
    getCurrentRace();
  }, []);

  useEffect(() => {
    setTitle(race.racename);
    setRaceId(race.raceid);
  }, [race]);


  const {
      heatList,
      crewList,
      selectedCrew,
      setSelectedCrew,
      setIsLoading,
      isLoading
  } = useRaceInstance(raceId);


  return (
    <div className="current-race">
      
      <h1 className="header">Current Race Results</h1>

      <RaceData
        title={title}
        raceId={raceId}
        heatList={heatList}
        crewList={crewList}
        setSelectedCrew={setSelectedCrew}
        selectedCrew={selectedCrew}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
  }
