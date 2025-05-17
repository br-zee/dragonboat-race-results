import "./RaceData.css";
import TableSkeletonLoader from "../tableSkeleton/tableSkeleton";
import Search from "../search/search";
import Table from "../table/table";

export default function RaceData({title, raceId, crewList, heatList, setSelectedCrew, selectedCrew, isLoading, setIsLoading}) {
    
    return (
        <>
            <h1 className='race-header'>
            {
            title
                ? title
                : "Loading race..."
            }
            </h1>

            <Search crewList={crewList} setSelectedCrew={setSelectedCrew}/>

            <div className='heats'>
            { 
            // If loading, then display skeleton table loaders
            isLoading                           
            ? <>
                <TableSkeletonLoader />
                <TableSkeletonLoader />
                <TableSkeletonLoader />
                <TableSkeletonLoader />
                </>

            // If there are no heats that can be displayed (display = false)
            : heatList.length === 0

                // Show that there are no available heats
                ? <p style={{ textAlign: 'center' }}>No race data available</p>

                // Otherwise display all heat data in individual tables
                : heatList.map((i, index) => {
                    return (
                        <Table key={'heat_'+index} 
                        data={{
                            heat: i.heat,
                            race_type: i.race_type,
                            race_id: raceId,
                            crew: selectedCrew,
                        }}
                        setIsLoading={setIsLoading}
                        />
                    )
                })              
            }    
            </div>
        </>
    )
}