import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { Note } from "./Note";
import { Badge} from 'react-bootstrap';

export const ListNotes = ({active}) => {

    const {tags,notes} = useContext(AppContext);
    const [filters,setFilters] = useState(tags.map( t => t.id));

    const handleFilterClick = (tag) => {
        const filterActive = filters.includes(tag.id);
        if(filterActive){
            return setFilters( filters.filter( id => id !== tag.id));
        }
        setFilters([
            ...filters,
            tag.id
        ])
    }

    return(
        <div>
            <div className='px-4 d-flex gap-1'>
                {tags.map( (tag,ind) => 
                    <Badge key={ind} bg={filters.includes(tag.id)?"primary":"secondary"} onClick={() => handleFilterClick(tag)}>{tag.name}</Badge>   
                )}
            </div>
            <div className='p-4'>
                {notes
                    .filter( n => n.isActive === active && filters.some( f => n.tags.map(t => t.id).includes(f)))
                    .map((note,ind) => 
                    <Note note={note} key={ind}/>
                )}
            </div>
        </div>
    )
}