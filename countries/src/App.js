import React, {useEffect, useState} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
// console.log(api_key)

const Country = ({country}) => {
  const [weatherCondition,setWeatherCondition] = useState(null)

  console.log('country',country)
  console.log('country.name',country.name)
  console.log("http://api.weatherstack.com/current?access_key="+api_key+"&query="+country.name)
  
  const hook1 = () => {
    console.log('FUCK PA')
    axios
    .get("http://api.weatherstack.com/current?access_key="+api_key+"&query="+country.name)
    .then(res=>{
      console.log(res)
      setWeatherCondition(res.data)
    })}

  console.log('weatherCondition',weatherCondition)
  useEffect(hook1,[country.name])
  console.log('weatherCondition',weatherCondition)

  return (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
    {country.languages.map(language=>
      <li key={language.name}>{language.name}</li>  
    )}
    </ul>
    <img src={country.flag} alt="Flag" width="100" height="100"/>
    <h2>Weather in {country.name}</h2>
    <div><strong>temperature:</strong> {weatherCondition?.current.temperature} Celcius</div>
    <img src={weatherCondition?.current.weather_icons} alt="Flag" width="70" height="70"/>
    <div><strong>wind:</strong> {weatherCondition?.current.wind_speed} mph direction {weatherCondition?.current.wind_dir}</div> 
    {/* {weatherCondition ? (<div><div><strong>temperature:</strong> {weatherCondition.current?.temperature} Celcius</div>
    <img src={weatherCondition.current?.weather_icons} alt="Flag" width="70" height="70"/>
    <div><strong>wind:</strong> {weatherCondition.current?.wind_speed} mph direction {weatherCondition.current?.wind_dir}</div> </div>):null} */}
  </div>)}


const Countries = ({filterCountries,setCountryName}) => {

  const handleShowFunction = (props) => {
    const selectOne = filterCountries.filter(country => country.name===props)
    setCountryName(selectOne[0].name)
  }

  if (filterCountries.length === 1) {
    const country = filterCountries[0];
    return <Country key={country.name} country={country}/>
  } else if (filterCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  return (
    <div>{filterCountries.map(country=> {
      return (
        <div key={country.name}>{
          country.name}
          <button onClick={()=>handleShowFunction(country.name)}>show</button>
        </div>
        // <Country key={country.name} country={country}/>
      )
    })}</div>
  )
}

// http://api.weatherstack.com/current?access_key=0e07de52e38d65d3111e677dcbb99ed3&query=New%20York

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setAllCountries(res.data))
  }

  useEffect(hook,[])

  const filterCountries = allCountries.filter(country=>
    country.name.toLowerCase().includes(countryName.toLowerCase())
  )

  const handleSearchCountries = (event) => {
    setCountryName(event.target.value)
  }
  return (
    <div>
      find countries <input value={countryName} onChange={handleSearchCountries}/>
      <Countries filterCountries={filterCountries}
       setCountryName={setCountryName}
       />
    </div>
  )
}

export default App