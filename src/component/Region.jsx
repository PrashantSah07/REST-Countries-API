import React from 'react'

const Region = (props) => {


    return (
        <>
            <select onClick={props.selectRegion} style={{ padding: "7px 20px 7px 10px", fontSize: "16px", borderRadius: "5px" }}>
                <option value="">Search by filter</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="europe">Europe</option>
                <option value="Americas">Americas</option>
                <option value="Antarctic">Antarctic</option>
                <option value="Oceania">Oceania</option>
            </select>

        </>
    )
}

export default Region
