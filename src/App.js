import React from 'react';
import './App.css';

 let allowedCities = [
    {city: 'Singapore', timezone: 'Asia/Singapore', timeDiff: '1hr ahead Seoul' },
    {city:'Tokyo', timezone: 'Asia/Tokyo', timeDiff: '0hr behind Seoul'},
    {city:'Seoul', timezone: 'Asia/Seoul',timeDiff: '0hr behind Seoul'},
    {city:'Melbourne', timezone:'Australia/Melbourne',timeDiff: '2hrs behind Seoul'},
    {city:'Sydney', timezone:'Australia/Sydney',timeDiff: '2hrs behind Seoul'},
    {city:'London', timezone:'Europe/London',timeDiff: '9hrs behind Seoul'},
    {city:'Paris', timezone:'Europe/Paris',timeDiff: '8hrs behind Seoul'},
    {city:'Berlin', timezone:'Europe/Berlin',timeDiff: '8hrs behind Seoul'},
    {city:'New York', timezone:'America/New_York',timeDiff: '13hrs behind Seoul'},
    {city:'Los Angeles', timezone:'America/Los_Angeles',timeDiff: '16hrs behind Seoul'}];

  const options = {
        timeZone:"Asia/Seoul",
        hour12 : true,
        hour:  "2-digit",
        minute: "2-digit",
      };

function App() {

  const clockObj = {
    cityName: "",
    shortLabel: '',
    localTime: null,
    timezone: '-',
    timeDiff:'-',
    abbr: '-',
    };

  const [cityList, setCityList] = React.useState(allowedCities);
  const [addClock, setAddClock] = React.useState({pos:-1, city:'', timezone: ''});
  const [showInput, setShowInput] = React.useState(-1);
  const [localTime, setLocalTime] = React.useState('--');
  const [currentCity, setCurrentCity] = React.useState('--');
  const [label, setLabel] = React.useState('');
  const [apiResponse, setApiResponse] = React.useState({});
  const [worldClock1, setWorldClock1]  = React.useState(clockObj);
  const [worldClock2, setWorldClock2]  = React.useState(clockObj);
  const [worldClock3, setWorldClock3]  = React.useState(clockObj);
  const [worldClock4, setWorldClock4]  = React.useState(clockObj);


  const clockList = [worldClock1, worldClock2, worldClock3, worldClock4];

  function showCity(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAVp43-oklCZwKwUGJlyu0BKkoX8I6Ny9Q`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Parse the city name from the API response
      const city = data.results.find((item) =>
        item.types.includes("locality")
      ).formatted_address;
      setCurrentCity(city)

    })
    .catch((error) => console.log(error));
}


  function success(position) {
  showCity(position)
  }

  function error() {
    console.log('Unable to retrieve the location')
  }
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    const localTimeInterval = setInterval(() => {
      const localTime = new Date().toLocaleTimeString("en-US",options);
      setLocalTime(localTime);
    }, 1000);

    return () => {
      clearInterval(localTimeInterval);
    };
  }, []);

  React.useEffect(() => {
    let worldClock1TimeInterval;
    if(worldClock1.localTime !== null) {
     worldClock1TimeInterval = setInterval(() => {
      const worldClock1Time = new Date().toLocaleTimeString("en-US", {...options, timeZone: worldClock1.timezone});
          setWorldClock1({
            ...worldClock1,
            localTime: worldClock1Time

          });    
        }, 1000);

        } return () => {
          clearInterval(worldClock1TimeInterval);
        };
  }, [worldClock1]);

  React.useEffect(() => {
    if(worldClock2.localTime !== null) {
    const worldClock2TimeInterval = setInterval(() => {
          const worldClock2Time = new Date().toLocaleTimeString("en-US", {...options, timeZone: worldClock2.timezone});
          setWorldClock2({
            ...worldClock2,
            localTime: worldClock2Time
          });
        }, 1000);

        return () => {
          clearInterval(worldClock2TimeInterval);
        };
        }
  }, [worldClock2]);

  React.useEffect(() => {
    if(worldClock3.localTime !== null) {
    const worldClock3TimeInterval = setInterval(() => {
          const worldClock3Time = new Date().toLocaleTimeString("en-US", {...options, timeZone: worldClock3.timezone});
          setWorldClock3({
            ...worldClock3,
            localTime: worldClock3Time
          });
        }, 1000);

        return () => {
          clearInterval(worldClock3TimeInterval);
        };
        }
  }, [worldClock3]);

  React.useEffect(() => {
    if(worldClock4.localTime !== null) {
    const worldClock4TimeInterval = setInterval(() => {
          const worldClock4Time = new Date().toLocaleTimeString("en-US", {...options, timeZone: worldClock4.timezone});
          setWorldClock4({
            ...worldClock4,
            localTime: worldClock4Time
          });
        }, 1000);

        return () => {
          clearInterval(worldClock4TimeInterval);
        };
        }
  }, [worldClock4]);

  React.useEffect(() => {
    if(addClock.pos > -1) { 
      let abbr= Object.keys(apiResponse).length > 0 ? apiResponse.abbreviation : '-';
      let timeDiff= '-';
      timeDiff = allowedCities.find(i => i.city === addClock.city) ? allowedCities.find(i => i.city === addClock.city).timeDiff : null;
      const localTime = processTime(addClock.timezone);
      switch (addClock.pos) {
        case 0:
          setWorldClock1({
            cityName: addClock.city,
            shortLabel: '',
            localTime: localTime,
            timezone: addClock.timezone,
            timeDiff: timeDiff,
            abbr,
          });
          break;
      case 1:
          setWorldClock2({
            cityName: addClock.city,
            shortLabel: '',
            localTime:localTime,
            timezone: addClock.timezone,
            timeDiff: timeDiff,

            abbr,
          });
          break;
      case 2:
          setWorldClock3({
            cityName: addClock.city,
            shortLabel: '',
            localTime: localTime,
            timezone: addClock.timezone,
            timeDiff: timeDiff,
            abbr,
          });
          break;
      case 3:
          setWorldClock4({
            cityName: addClock.city,
            shortLabel: '',
            localTime: localTime,
            timezone:addClock.timezone,
            timeDiff: timeDiff,
            abbr,
          });
          break;
          
      default: break;
      }
    }
  }, [addClock, apiResponse, cityList]);

const removeClock = (position, cityName) => {
    switch (position) {
        case 0:
          setWorldClock1(clockObj);
          break;
      case 1:
           setWorldClock2(clockObj);
          break;
      case 2:
          setWorldClock3(clockObj);
          break;
      case 3:
          setWorldClock4(clockObj);
          break;
      default: break;
      }
    let city = allowedCities.find(i => i.city === cityName)
    let cityArr = cityList;
   if(!!city) setCityList([...cityArr, {...city}]);      
}
    
const changeLabel = (position, label) => {
   switch (position) {
        case 0:
          setWorldClock1({
            ...worldClock1,
            shortLabel: label,
          });
          break;
      case 1:
          setWorldClock2({
              ...worldClock2,
            shortLabel: label,
          });
          break;
      case 2:
          setWorldClock3({
              ...worldClock3,
            shortLabel: label,
          });
          break;
      case 3:
          setWorldClock4({
             ...worldClock4,
            shortLabel: label,
          });
          break;
      default: break;
      }
    setLabel('');
    setShowInput(-1);
}

const submitLabel = (pos) => {
   if(showInput === pos) {
      setShowInput(-1);
      changeLabel(pos, label);
    } else {
      setShowInput(pos);
    }
}

const fetchWorldTimeApi = (timezone) => { 
  
  fetch("http://worldtimeapi.org/api/timezone/" + timezone)
      .then(res => res.json())
      .then(
        (result) => {
          setApiResponse(result);
        },
        (error) => {
          console.log(error);
        }
    );

};

const processTime = (timezone) => {

let time = new Date().toLocaleTimeString("en-US",  {
        timeZone: timezone,
        hour12 : false,
        hour:  "2-digit",
        minute: "2-digit",
      });
return  time;
};

return (
    <div className="App">
      <div className="my-city-container">
        <div className="my-city-name" data-testid="myCityName">{currentCity}</div>
        <div className="my-city-time">{localTime}</div>
      </div>
    <div className="world-clock-container">
       {clockList.map((clockItem, idx) => 
          <div key={idx}>
            {clockItem.cityName !== '' ? 
              <div className='world-clock-item'>
                <div className="city-name">{clockItem.cityName}</div>
                <div className="city-label" >
                  {showInput === idx ? 
                    <div>
                      <input type="text" autoFocus={true} value={label}
                        maxLength={20}
                        onChange={(e)=> setLabel(e.target.value )} 
                        onBlur={()=>submitLabel(idx)}
                        onKeyDown={(e)=> e.key === 'Enter' && submitLabel(idx) }/>
                    </div>
                  : <span>
                      {clockItem.shortLabel}
                    </span>  
                  }
                    <button
                    className='edit-btn'
                    onClick={()=> {
                     submitLabel(idx)
                      }}>
                      {clockItem.shortLabel === '' || clockItem.shortLabel === '-' ? '+ Add Note' : 'Edit'}</button>
                  </div>
                <div className="world-clock-item-time">{clockItem.localTime}</div>
                <div className="world-clock-item-timezone">{clockItem.abbr}</div>
                <div className="world-clock-item-timeDiff">{clockItem.timeDiff}</div>
                <button className='edit-btn' onClick={() => removeClock(idx, clockItem.cityName)}>- Remove</button>
              </div>
              : 
              <div className='world-clock-item'>
                <button data-testid="addButton" className="add-btn" onClick={()=> setShowInput(showInput === idx ? -1 : idx)}>
                  + Add City
                </button>
                {showInput === idx && 
                  <div className="city-list-container" data-testid="cityListContainer">
                      {cityList.map(item => 
                        <div key={item.city} className="city-list-item-div" 
                        onClick={()=> {
                          setAddClock({pos: idx, city: item.city, timezone: item.timezone}); 
                          setCityList(cityList.filter(i => i.city !== item.city));
                          fetchWorldTimeApi(item.timezone);
                          setShowInput(-1);
                          }}>
                          {item.city}
                        </div>)}
                  </div>
                }
              </div>
            }
      </div>
       )}
    </div>
    <div className='footer'>Created By Thanda Oo</div>
  </div>
);
}

          
export default App;
