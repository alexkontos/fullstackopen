const TotalParts = ({parts}) => { 
    let total = 0;
    parts.map(part => {
        total += part.exercises
        return total;
    })
    return(
        <p><strong>Total of {total}</strong></p>
    )
 }

 export default TotalParts