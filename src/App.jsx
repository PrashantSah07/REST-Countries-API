import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import Cards from './component/Cards'
import Search from './component/Search'
import LoadingSpinner from './assets/spinner.gif'

import './App.css'

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let response2 = await response.json();
        setData(response2)
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false)
    }

    getData();

  }, [])

  async function selectCountry(e) {
    setLoading(true);
    try {
      if (e.target.value.trim() === '') {
        // let response = await fetch('https://restcountries.com/v3.1/all');
        // let response2 = await response.json();
        // setData(response2);
      }
      else {
        let country = (e.target.value)
        let res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!res.ok) {
          setLoading(false);
          setNotFound(true);
          return
        }
        let res2 = await res.json();
        setData(res2)
        setNotFound(false);
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);

  }

  async function selectRegion(e) {
    setLoading(true);
    try {
      if (e.target.value === '') {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let response2 = await response.json();
        setData(response2)
      } else {
        const selectedRegion = e.target.value;
        let res = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
        let res2 = await res.json();
        setData(res2)
      }
    }
    catch (error) {
      console.error("Error fetching region data:", error);
    }
    setLoading(false)
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className='filter'>
          <Search selectCountry={selectCountry} selectRegion={selectRegion} />
        </div>
        {loading && <p style={{ display: 'flex', justifyContent: 'center' }}><img className='loadingspinner' src={LoadingSpinner} alt="Loading..." /></p>}
        {notFound && <h1 style={{ color: 'red', textAlign: 'center' }}>Country not found!</h1>}
        <div className='countryData'>
          {data.map(function (e, key) {
            return <div key={key} className="" >
              <Cards
                imageSrc={e.flags.svg}
                countryName={e.name.common}
                population={e.population}
                region={e.region}
                capital={e.capital ? e.capital[0] : "No capital"}
                currencies={e.currencies ? Object.values(e.currencies)[0].symbol : "No currency"}
                timezones={e.timezones}
                continents={e.continents}
                maps={<a target='_blank' href={e.maps.googleMaps}>{e.name.common}</a>}
              />
            </div>
          })}
        </div>
      </main>
    </>
  )
}

export default App
