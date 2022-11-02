import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Card } from 'antd';

function App() {
  const [country, setCounry] = useState();
  const [countryMatch, setCountryMatch] = useState([]);

  const searchCountry = (text) => {
    console.log('searchCountry called', text)
    if (!text) {

      setCountryMatch([]);

    } else {

      const getCountry = async () => {
        const res = await axios.get('https://restcountries.com/v2/name/' + text);
        console.log('----', res.data.length)

        if (res.data) {
          setCountryMatch(res.data);
        } else {
          setCountryMatch([]);
        }
      };
      getCountry();
    }
  }

  return (
    <div className="App">
      <h2>Auto Complete</h2>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', alignItems: 'center' }}>

        <Input
          style={{ width: '40%', marginTop: '10px' }}
          placeholder='search'
          value={country}
          onChange={(e) => [searchCountry(e.target.value), setCounry(e.target.value)]}
        />
        
        {countryMatch.length > 0 &&
          <div className='optionWrapper' 
            style={{ marginTop: '55px', maxHeight: '100px', height: 'auto', 
            zIndex: 9, border: '1px solid #000', backgroundColor: 'white', 
            position: 'absolute', overflow: 'scroll', width: '40%' }}
            >
            {countryMatch.length > 0 &&
              countryMatch.map((item, i) => {
                return <div className='option' onClick={(e) => [setCounry(item.name), setCountryMatch([])]}>
                  {item.name}
                </div>
                // <div key={i} style={{ width: '100%', marginTop: '1px', fontSize: '1rem',  cursor: 'pointer' }}>
                // <Card className='option' onClick={(e) => [setCounry(item.name), setCountryMatch([])]}>
                //   {item.name}
                // </Card>
                // </div>
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
