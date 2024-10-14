"use client";
import './styles.modules.css';
import { useRaces } from './useRaces';
import { useEffect, useState } from 'react';
import { useRaceData } from './pages/[raceId]/useRaceData';
import { supabase } from './lib/stores/supabase';
import Table from './pages/[raceId]/table';

export default function Landing() {

  const { race, races, getCurrentRace, getRaces, subscribeToRaces } = useRaces();
  const { heatList, setHeatList, getHeatList, subscribeToHeatList } = useRaceData();
  const [ prevHeatList, setPrevHeatList ] = useState([]);
  const { crewList, getAllCrews } = useRaceData();

  const [ selectCrew, setSelectCrew ] = useState('*');  
  const [ newCrew, setNewCrew ] = useState('');

  const filterCrew = (value) => setSelectCrew(value)

  const current_race = races[races.length-1];
  const title = current_race['raceName'], raceId = current_race['raceId'];
  const [ isLoading, setIsLoading ] = useState(false)

  const handleReset = (() => {
    const crew_input = document.getElementById('crew');
    crew_input.value = '';
    filterCrew('*');
  })

  const handleKeyUp = ((e) => {
    const input = document.getElementById('crew');
    const text = e.target.value
    if (text == '' || text == '--DEFAULT--') { filterCrew('*') } 
    else { filterCrew('%'+text+'%'); }
    input.focus();
  })

  useEffect(() => {
    if (races[0].max == -1) {
      getRaces();
    }
  }, [races])

  useEffect(() => {
    if (JSON.stringify(heatList) != JSON.stringify(prevHeatList) || heatList.length < 1) {
      getHeatList(raceId, selectCrew);
      setPrevHeatList(heatList)
      setIsLoading(false);
    }
  }, [heatList, race])

  useEffect(() => {
    if (selectCrew != '*' || newCrew == '*') {
      setHeatList([]);
      setNewCrew(selectCrew);
      setIsLoading(true);
    }
    else {setNewCrew(selectCrew);}
  }, [selectCrew, newCrew])

  useEffect(() => {
    if (crewList.length < 1) {
      getAllCrews(raceId);
    }
  }, [crewList])

  useEffect(() => {
    if (heatList.length >= 1) {
      setHeatList([]);
    }
    subscribeToHeatList();
    subscribeToRaces();
  }, [supabase])

  return (
    <>
      <h1 className="header">NCIDBF Race Results</h1>
          <div className='race-header'>
            <h1>{title}</h1>

            <label htmlFor='crew'>Filter by crew:</label>
            <input list='crews-list' name='crew' id='crew' placeholder="Input crew name" 
            onChange={({target}) => {target.value != '--DEFAULT--' ? filterCrew('%'+target.value+'%') : filterCrew('*');}}
            onKeyUp={(e) => handleKeyUp(e)}
            >
            </input>
            <datalist name='crew-list' id='crews-list'>
            {/* <select name='crews' id='crews' 
            onChange={({target}) => {target.value != 'choose_option' ? filterCrew(target.value) : filterCrew('*')}}
            > */}
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
            {/* </select> */}
            </datalist>

            <button onClick={handleReset}>Reset</button>

          </div>
          <div className='heats'>
            { 
            // isLoading 
            // ? 
            // <div>Loading...</div> 
            // :            
            heatList.map((i, index) => {
                return (
                    <Table key={'heat_'+index} 
                    data={{heat: i.heat, race_type: i.race_type, race_id: raceId, crew: selectCrew}}
                    />
                )
            })              
            }    
          </div>
    </>
  );
  }
