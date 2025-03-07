import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import LoadingSpinner from './assets/spinner.gif'
import { Link, useParams } from "react-router-dom";

const CountryCard = () => {
    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    // let country = new URLSearchParams(location.search).get('name');
    let { country } = useParams();

    useEffect(() => {
        async function getData() {
            setLoading(true)
            try {
                let res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
                if (!res.ok) {
                    setLoading(false)
                    setNotFound(true)
                    return;
                }
                let res2 = await res.json();
                setData(res2)
            }
            catch (error) {
                console.log(error)
            }

            setLoading(false)
        }
        getData();

    }, [])

    return (
        <>
            <Navbar />
            <button className='back-button'><Link to="/" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.0003 12.9999L22.0004 11L8.41421 11V5.58582L2 12L8.41421 18.4142L8.41421 13L22.0003 12.9999Z"></path></svg>Back</Link></button>
            {Loading && <p style={{ display: 'flex', justifyContent: 'center' }}><img className='loadingspinner' src={LoadingSpinner} alt="Loading..." /></p>}
            {notFound && <h1 style={{ color: 'red', textAlign: 'center' }}>Country not found!</h1>}
            {data.map(function (e, key) {
                return <div key={key} className='countryCard'>
                    <img src={e.flags.svg} alt={e.name.common} />
                    <div>
                        <h1>{e.name.common}</h1>
                        <p><b>Official:</b> {e.name.official}</p>
                        <p><b>Native Name:</b> {Object.values(e.name.nativeName)[0].common}</p>
                        <p><b>Population:</b> {e.population.toLocaleString('un-IN')}</p>
                        <p><b>Region:</b> {e.region}</p>
                        <p><b>Sub Region:</b> {e.subregion}</p>
                        <p><b>Capital:</b> {e.capital}</p>
                        <p><b>Timezones:</b> {e.timezones}</p>
                        <p><b>Continent:</b> {e.continents}</p>
                    </div>
                    <div>
                        <p><b>Currencies:</b> {e.currencies ? Object.values(e.currencies)[0].symbol : "No currency"}</p>
                        <p><b>Languages:</b> {e.languages.eng}</p>
                        <iframe src={`https://www.google.com/maps/embed?pb=${e.maps.googleMaps}`} frameBorder="0" height="350">
                        </iframe>
                    </div>
                </div>
            })}
        </>
    )
}

export default CountryCard
