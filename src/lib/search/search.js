"use client";

import "./search.css";

export default function Search({crewList, setSelectedCrew}) {
    
    const handleReset = (() => {
        const crew_input = document.getElementById('crew');
        crew_input.value = '';
        setSelectedCrew('*');
      });
    
      const handleKeyUp = ((e) => {
        const input = document.getElementById('crew');
        const text = e.target.value;
        if (text == '' || text == '--DEFAULT--') { setSelectedCrew('*') } 
        else { setSelectedCrew('%'+text+'%'); }
        input.focus();
      });

    return (
        <div className="search-box-wrapper">

            <p className="filter-label">Filter by crew:</p>

            <div className="search-box">
                <input list='crews-list' name='crew' id='crew' placeholder="Input crew name"
                    onChange={({target}) => {target.value != '--DEFAULT--' ? setSelectedCrew('%'+target.value+'%') : setSelectedCrew('*');}}
                    onKeyUp={(e) => handleKeyUp(e)}
                />
                <datalist name='crew-list' id='crews-list'>
                    <option value="--DEFAULT--" id='default-option'>-- DEFAULT --</option>
                    {
                    crewList.map((crew, index) => {
                        return (
                        <option key={'option_'+index} id={'option_'+index} value={crew}>
                            {crew}
                        </option>
                        )
                    })
                    }
                </datalist>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

// Previous select option
{/* <select name='crews' id='crews' 
    onChange={({target}) => {target.value != 'choose_option' ? filterCrew(target.value) : filterCrew('*')}}
></select> */}