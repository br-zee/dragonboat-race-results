import "../table/table.css";
import "./tableSkeleton.css";

export default function TableSkeletonLoader() {
    const skeletonData = {
        heat: "",
        race_type: "",
        crew: '',
        lane: "",
        race_time: "",
        placement: "",
        next_heat: "",
        display: true
    };

    const skeletonRows = new Array(5).fill("");
    let bg_color = "";

    return (
        <>
        <table>
            <thead>
                <tr className="heat-title">
                    <td id="heat-title" colSpan='5'><b>Heat {skeletonData.heat}: {skeletonData.race_type}</b></td>
                </tr>
                <tr>
                    <td className='crew-title'>Crew</td>
                    <td className='lane-title'>Lane</td>
                    <td className='time-title'>Time</td>
                    <td className='placement-title'>Placement</td>
                    <td className='next-heat-title'>Next Heat</td>
                </tr>
            </thead>
            <tbody>
                {
                skeletonRows.map((skeleton, index) => {
                    index % 2 == 0 ? bg_color = '#d4deeb' : bg_color = '#b7c6da';
                    if ((skeletonData.display != false || skeletonData.crew != '*')) {
                        return (
                            <tr key={'row_'+index} style={{backgroundColor: bg_color}} className="crew-row">
                                <td><b>&zwnj;</b></td>
                                <td>{skeletonData.lane}</td>
                                <td>{skeletonData.race_time}</td>
                                <td>{skeletonData.placement}</td>
                                <td>{skeletonData.next_heat}</td>
                            </tr>
                        )  
                    }
                })
                }
            </tbody>
        </table>
        </> 
    );
}