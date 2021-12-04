import React, { useState, useEffect } from 'react'

import './style.css'
function App() {

  const [city, setCity] = useState('London')

  //This temperatures state is keeping the track of the result of the city and this is been keeps on updating when the user enters something in the search area
  const [temperatures, setTemperatures] = useState(null)
  //let url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=f6be07b44929e21c0b5fe5e54f1d51d8';

  //on change of user input we are changing the state variable
  const onCityChange = (e) => {
    setCity(e.target.value)
  }

  /*
  The below is the response when we call the API with the valid city name 
  {"coord":{"lon":72.8479,"lat":19.0144},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50d"}],"base":"stations","main":{"temp":29.99,"feels_like":35.01,"temp_min":28.94,"temp_max":29.99,"pressure":1010,"humidity":70},"visibility":2500,"wind":{"speed":4.12,"deg":250},"clouds":{"all":40},"dt":1638612632,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1638581251,"sunset":1638621023},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}
  
  From the above result we are setting only the "main" to the temperature state variable because it has the temp,temp_min and temp_max variables thats what we need for our application
  */

  const apicall = async (city_name) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=f6be07b44929e21c0b5fe5e54f1d51d8`);
    const json = await response.json();
    console.log(JSON.stringify(json.main));
    //console response
    // {"temp":29.99,"feels_like":35.01,"temp_min":28.94,"temp_max":29.99,"pressure":1010,"humidity":70}
    setTemperatures(json.main)

  }
  //Here we are using --> useEffect() as a componentDidMount and componenetDidUpdate 
  useEffect(() => {
    apicall(city);
  }, [city])

  /*----------------------------Summary of project----------------

    1) Here we are using two state hook
    2) the first one that is city state variable is keeping the track of the user entered city name and we are setting the city state when the user enters something using the onChange={} event listener. And we are keeping the London as a initial state variable 
    3) The second state variable that is temerature is keeping the track of the temperature details of that city which user has entered.
    4) All these state variables are binded using the HOOK named useEffect() hook. Here we are uing the useEffect as a componentDidMount and componenetDidUpdate. 
           useEffect(() => {
              apicall(city);
            }, [city])
            
            Here we are calling the method called apicall() and passing the city name as a argument and then in the array [city] denotes when ever the user changes anything in the search box this useEffect will run as componentDidUpdate and will call the api using the apicall() method and do the job for us.
    5) In the bottom we are showing the results when the temperature state variable is not null else we are showing that pls enter the correct city name. And remember at each letter input in the seach area we are calling the useEffect so thats why temperature state variable will be set only when the user has entered the correct city name because at that time only the api will run successfully and will get the response.
      
    
    ***********************This project was awesome lot to learn****************








                                            ------------------------------------------------------------------- */
 


  return (
    <>
      {/* {
        temperatures ? <div className="main-div">
          <div className="center-div">
            <h2>Your Weather App</h2>
            <input type="search" placeholder="Enter your city name " value={city} onChange={onCityChange} />
            <div className="search-place">
              <i className="fas fa-street-view"></i>
              <h2>{city}</h2>
              <h1>&nbsp; {temperatures.temp} C</h1>
            </div>
            <h3>Min:5.34 C | Max: 12.21 C</h3>
          </div>
        </div> : "Not Found"
      } */}

      {/* <div className="main-div">
        <div className="center-div">
          <h2>Your Weather App</h2>
          <input type="search" placeholder="Enter your city name " value={city} onChange={onCityChange} />
          <div className="search-place">
            <i className="fas fa-street-view"></i>
            <h2>{city}</h2>
            {
              temperatures ? <h1>&nbsp; {temperatures.temp} C</h1> : "Not Found"
            }
          </div>
          <h3>Min:5.34 C | Max: 12.21 C</h3>
        </div>
      </div> */}

{/* The above are just the trials when i was configuring how i can show things in a nicer way */}
      <div className="main-div">
        <div className="center-div">
          <h2>Your Weather App</h2>
          <input type="search" placeholder="Enter your city name " value={city} onChange={onCityChange} />
          {
            temperatures ? <div className="search-place">
              <div className="answer">
                <i className="fas fa-street-view"></i>
                <h2>{city}&nbsp; {temperatures.temp} &#8451;</h2>
                
              </div>
              <h1>Min: {temperatures.temp_min} &#8451; | Max: {temperatures.temp_max} &#8451;</h1>
            </div> : <div style={{marginTop:"2rem",color:"red"}}> <h1> Enter a Valid City Name</h1> </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;
