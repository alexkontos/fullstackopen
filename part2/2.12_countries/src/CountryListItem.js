import CountryView from "./CountryView"
import { useState } from 'react'

const CountryListItem = ({ country }) => {
    const [isShowingDetails, setIsShowingDetails] = useState(false)

    const handleButtonPress = () => {
        setIsShowingDetails(!isShowingDetails)
    }

    return (
        <div>
            <p>{country.name.common} <button onClick={handleButtonPress}>show</button></p>
            {isShowingDetails ?
                <CountryView country={country} />
                : <></>}
        </div>
    )
}

export default CountryListItem