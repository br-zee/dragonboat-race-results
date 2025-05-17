import { useEffect, useState, useRef } from "react"
import { useRaceData } from '../../hooks/useRaceData';
import { supabase } from "@/lib/stores/supabase";
import './table.css';

export default function Table({data, setIsLoading}) {
    const {raceData, setRaceData, getRaceData, subscribeToRaceData} = useRaceData();
    const {heatList, setHeatList} = useRaceData();

    let bg_color = 'white';

    useEffect(() => {
        getRaceData(data.heat, data.crew, data.race_id)
    }, [data.heat, supabase])

    useEffect(() => {
        setRaceData(raceData);
    }, [raceData, data])

    useEffect(() => {
        subscribeToRaceData();
        getRaceData(data.heat, data.crew, data.race_id);
    }, [supabase, data])

    const displayList = raceData.map(race => race.display);
    if (displayList.includes(true)) {
    return (
        <>
        <table>
            <thead>
                <tr className="heat-title">
                    <td id="heat-title" colSpan='5'><b>Heat {data.heat}: {data.race_type}</b></td>
                </tr>
                <tr>
                    <td className='crew-title'>Crew</td>
                    <td className='lane-title'>Lane</td>
                    <td className='time-title'>Time</td>
                    <td className='placement-title'>Placement</td>
                    <td className='next-heat-title'>Next Heat</td>
                    {/* <td className='est-start-title'>Est. Start Time</td> */}
                </tr>
            </thead>
            <tbody>
                {
                raceData.map((rData, index) => {
                    index % 2 == 0 ? bg_color = '#d4deeb' : bg_color = '#b7c6da';
                    if ((rData.display != false)) {
                        return (
                            <tr key={'row_'+index} style={{backgroundColor: bg_color}} className="crew-row">
                                <td><b>{rData.crew}</b></td>
                                <td>{rData.lane}</td>
                                <td>{rData.race_time}</td>
                                <td>{rData.placement}</td>
                                <td>{rData.next_heat}</td>
                                {/* <td>{rData.estimated_start_time}</td> */}
                            </tr>
                        )  
                    }
                })
                }
            </tbody>
        </table>
        </> 
    )
}
}

