import Part from './Part'
import TotalParts from './TotalParts'

const Content = ({parts}) => { 
    return(
        <div>
            {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)}
            <TotalParts parts={parts}></TotalParts>
        </div>
    )
 }

 export default Content;