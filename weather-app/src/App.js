import React, { useState } from 'react';
import './index.css';
const api = {
  key: "b50bb9b8e75bac995437f2ce63f17799", 
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const searchResult = detail => {
    if(detail.key === 'Enter')
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
            if(result.cod === 404)
            alert(result.message);
          });         
    }
  }

  const daySelector = detail => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = days[detail.getDay()];
    let date = detail.getDate();
    let month = months[detail.getMonth()];
    let year = detail.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }


    return (
      <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 20) ? 'App dusk' : 'App') : 'App'}>
        <main>
          <div className = 'search-bar'>
            <input type='text' 
            className='search' 
            placeholder='Enter City name' 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={searchResult}
            />
          </div>

          <div className="break"></div>

          {(typeof weather.main != 'undefined') ? 
          (
          <div>  
          <div className= 'location-bar'>
            <div className='location'>{weather.name}, {weather.sys.country}</div><br />
            <div className='details'>
            <div className='date'>{daySelector(new Date())}</div><br />
            <div className='temp'>{Math.round(weather.main.temp)}°C</div><br />
          <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
          </div>
          ) : ('')}

          </main>
      </div>
    );
  }

export default App;
