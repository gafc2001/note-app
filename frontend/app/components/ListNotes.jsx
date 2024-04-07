import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { Note } from "./Note";
import { Badge} from 'react-bootstrap';

export const ListNotes = ({active}) => {

    const {tags,notes} = useContext(AppContext);
    const [filters,setFilters] = useState(tags.map( t => t.id));

    const handleFilterClick = (tagId) => {
        const filterActive = filters.includes(tagId);
        if(filterActive){
            return setFilters( filters.filter( id => id !== tagId));
        }
        setFilters([
            ...filters,
            tagId
        ])
    }

    useEffect(() => {
        setFilters( [...tags.map( t => t.id),0])
    },[tags])

    return(
        <div>
            <div className='px-4 d-flex gap-1 flex-wrap py-1'>
                {tags.map( (tag,ind) => 
                    <Badge className="cursor" key={ind} bg={filters.includes(tag.id)?"primary":"secondary"} onClick={() => handleFilterClick(tag.id)}>{tag.name}</Badge>   
                )}
                {console.log(filters)}
                <Badge className="cursor" bg={filters.includes(0)?"primary":"secondary"} onClick={() => handleFilterClick(0)}>Todos</Badge>   
            </div>
            <div className='p-4 notes-container'>
                {notes
                    .filter( n => {
                        const tagsId = n.tags.map(t => t.id);
                        return n.isActive === active && (filters.some( f => tagsId.includes(f)) || (filters.includes(0)))
                    })
                    .map((note,ind) => 
                    <Note note={note} key={ind}/>
                )}
            </div>
        </div>
    )
}