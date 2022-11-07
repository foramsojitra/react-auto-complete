import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Card } from 'antd';

function App() {
  const [country, setCounry] = useState();
  const [countryMatch, setCountryMatch] = useState([]);
  const [active, setActive] = useState(0);

  const searchCountry = (text) => {
    // console.log('searchCountry called', text)
    if (!text) {

      setCountryMatch([]);

    } else {

      const getCountry = async () => {
        const res = await axios.get('https://restcountries.com/v2/name/' + text);
        if (res.data) {
          setCountryMatch(res.data);
        } else {
          setCountryMatch([]);
        }
      };
      getCountry();
    }
  }

  const onKeyDown = e => {
    // console.log('ON key down', e.target.value, e.keyCode, active, country, countryMatch[active])
    if (e.keyCode === 13) { // enter key
      // console.log(country[active], active, 'vvbvv')
      setActive(0);
      setCountryMatch([]);
      setCounry(countryMatch[active].name);
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      console.log(country.length, active)
      return (active - 1 === countryMatch.length) ? null : setActive(active + 1);
    }
  };

  return (
    <div className="App">
      <h2>Auto Complete</h2>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', alignItems: 'center' }}>

        <Input
          style={{ width: '40%', marginTop: '10px' }}
          placeholder='search'
          value={country}
          onChange={(e) => [searchCountry(e.target.value), setCounry(e.target.value), setActive(0)]}
          onKeyDown={onKeyDown}
        />
        
        {countryMatch.length > 0 &&
          <div className='optionWrapper' 
            style={{ marginTop: '55px', maxHeight: '100px', height: 'auto', 
            zIndex: 9, border: '1px solid #000', backgroundColor: 'white', 
            position: 'absolute', overflow: 'scroll', width: '40%' }}
            >
            {countryMatch.length > 0 &&
              countryMatch.map((item, i) => {
                return <div 
                className = {i === active ? 'active' : 'option'} 
                onClick={(e) => [setCounry(item.name), setCountryMatch([])]}>
                  {item.name} {i}
                </div>
              })}
          </div>}
        <br />
        <Input
          style={{ width: '40%', marginTop: '10px' }}
          placeholder='search'
        />

      </div>
    </div>
  );
}

export default App;
