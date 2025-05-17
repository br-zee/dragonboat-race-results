"use client";
import { useEffect, useState } from 'react';
import { useRaces } from './useRaces';
import { useRaceData } from './useRaceData';
import { supabase } from '@/lib/stores/supabase';

export function useRaceInstance(raceId) {
    const { race, races, getCurrentRace, getRaces, subscribeToRaces } = useRaces();
    const { heatList, setHeatList, getHeatList, subscribeToHeatList } = useRaceData();
    const { crewList, getAllCrews } = useRaceData();

    const [ prevHeatList, setPrevHeatList ] = useState([]);
    const [ selectedCrew, setSelectedCrew ] = useState('*');  
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (races[0].max == -1) {
          getRaces();
        }
    }, [races]);
    
    useEffect(() => {
        if (JSON.stringify(heatList) != JSON.stringify(prevHeatList) || heatList.length < 1) {
          getHeatList(raceId, selectedCrew);
          setPrevHeatList(heatList)
        }
    }, [heatList, race]);

    useEffect(() => {
        setHeatList([]);
        setIsLoading(true);
        getHeatList(raceId, selectedCrew).then(() => {
        setIsLoading(false);
        });
    }, [selectedCrew]);
    
    useEffect(() => {
        if (crewList.length < 1) {
            getAllCrews(raceId);
        }
    }, [race]);
    
    useEffect(() => {
        if (heatList.length >= 1) {
            setHeatList([]);
        }
        subscribeToHeatList();
        subscribeToRaces();
    }, [supabase]);

    return {
        heatList,
        crewList,
        selectedCrew,
        setSelectedCrew,
        setIsLoading,
        isLoading,
        race,
        races
    }
}