'use client';
import { useRaceInstance } from '@/hooks/useRaceInstance';

import RaceData from '@/lib/RaceData/RaceData';

export default function Race({ params }) {

    const title = (params.raceId).slice(0, params.raceId.indexOf('-')).replaceAll('%20', ' ');
    const raceId = (params.raceId).slice(params.raceId.indexOf('-')+1);

    const {
      heatList,
      crewList,
      selectedCrew,
      setSelectedCrew,
      setIsLoading,
      isLoading
  } = useRaceInstance(raceId);

    return (
        <>
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
        </>
    )
}