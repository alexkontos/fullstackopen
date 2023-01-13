import CountryListItem from './CountryListItem';
import CountryView from './CountryView';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [isTooManyCountries, setIsTooManyCountries] = useState(false)
  const [isSpecificCountry, setIsSpecificCountry] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    const countriesTemp = countries.filter(country => country.name.common.toUpperCase().includes(value.toUpperCase()))
    if (countriesTemp.length < 10) {
      setIsTooManyCountries(false)
      setIsSpecificCountry(false)
      setCountriesToShow(countriesTemp)
      if (countriesTemp.length === 1) {
        setIsSpecificCountry(true)
      }
    }
    else {
      setIsTooManyCountries(true)
      setIsSpecificCountry(false)
    }
  }

  return (
    <div className="App">
      find countries <input onChange={handleSearch}></input>
      {
        isTooManyCountries ?
          <p>Too many countries</p> :
          isSpecificCountry ?
            countriesToShow.map(country => <CountryView key={country.name.common} country={country} />) :
            countriesToShow.map(country => <CountryListItem key={country.name.common} country={country} />)
      }
    </div>
  );
}

export default App;
