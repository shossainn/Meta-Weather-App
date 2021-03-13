import React from "react";
import axios from "axios";

const axiosIntance = axios.create({
  baseURL: "https://www.metaweather.com/api",
});
const App = () => {
  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState("");
  const findCity = () => {
    if (city === "") {
      return;
    }
    console.log(city, "ajmal");
    axiosIntance
      .get(`/location/search/?query=${city}`)
      .then((res) => {
        console.log(res.data[0].woeid);
        axiosIntance
          .get(`/api/location/${res.data[0].woeid}/`)
          .then((res) => {
            setWeather(res.data.consolidated_weather[0].weather_state_name);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p style={{color:"white", fontWeight: "bolder", fontSize: "25px"}}> <br></br><br></br>Please Enter the name of the City:</p>
      <input style={{textAlign:"center", alignContent:"center", backgroundColor:"", width: "300px", height: "30px"}}
        type="text"
        value={city}
        onChange={(text) => {
          setCity(text.target.value);
        }}
        placeholder="Enter your city.."
      />
      <br></br>
      <button onClick={findCity} style={{backgroundColor: "purple", color: "white", width: "50px", height: "30px", padding: "3px", margin: "5px"}}>Check</button>
      {weather ? (
        <span style={{color:"white"}}>
          weather of {city} is {weather}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
export default App;
