const TotalParts = ({parts}) => { 
    const total = parts.reduce((sum, current) => {
        return sum + current.exercises
    }, 0)
    return(
        <p><strong>Total of {total}</strong></p>
    )
 }

 export default TotalParts