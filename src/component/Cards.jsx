import React from 'react'
import styles from './Cards.module.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <>
            <div className={styles.cards}>
                <Link to={`/${props.countryName}`}>
                    <img src={props.imageSrc} alt="" />
                </Link>
                <div>
                    <h2>{props.countryName}</h2>
                    <p>Population: {props.population.toLocaleString('un-IN')}</p>
                    <p>Region: {props.region}</p>
                    <p>Capital: {props.capital}</p>
                    <p>currencies: {props.currencies}</p>
                    <p>timezones: {props.timezones}</p>
                    <p>continents: {props.continents}</p>
                    <p>see in map: {props.maps}</p>
                </div>
            </div>
        </>
    )
}

export default Card
