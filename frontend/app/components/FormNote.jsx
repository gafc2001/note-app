
import { useContext, useEffect, useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { httpClient } from '../services/httpClient';
import { useRouter } from 'next/router';
import { deleteNoteTag } from '../services/notes';
import { AppContext } from '../context/AppContext';


const initForm = {
    text : "",
    search : "",
    tags : [],
}
export const FormNote = ({data = initForm}) => {
 
    const [form,setForm] = useState(data);
    const [validated,setValidated] = useState(false);
    const [tagsListOpen,setTagsListOpen] = useState(false);

    const {tags,setModal,setNotes,setTags} = useContext(AppContext);

    const handleChange = (name,value)=> {
        if(name === "tags"){
            value = [
                ...form.tags,
                value,
            ];
        }
        setForm({
            ...form,
            search : "",
            [name] : value
        })
        
    }

    const handleOpenListTags = () => setTagsListOpen(true);
    const handleCloseListTags = () => {
        
        setTimeout(() => {
            setTagsListOpen(false)
        },[200])
    }
    useEffect(() => {
        setForm({
            ...form,
            search : "",
        })
    },[form.tags])

    const handleRemoveTag = async (tag) => {
        if(!!form.id){
            const response = deleteNoteTag();
        }
        setForm({
            ...form,
            tags : form.tags.filter( tagI => tag.name !== tagI.name)
        })
        
    }

    const handleSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (e.target.checkValidity() === false) {
            return;
        }
        const data = {
            ...form,
            tags : form.tags.map( t => t.name),
        }
        const response = await httpClient.post("api/v1/notes",data);
        if(response.status){
            setNotes( prev => {
                return [
                    response.data,
                    ...prev,
                ]
            })
            setModal( prev => {
                return {
                    ...prev,
                    show : false,
                }
            })
            setTags( prev => {
                const allTags = [...form.tags,...prev];
                const arrayUniqueById = [...new Map(allTags.map(item =>
                                        [item.id, item])).values()];
                console.log(arrayUniqueById);
                return arrayUniqueById;
            })
        }
    }

    return (
    <Form validated={validated} noValidate onSubmit={handleSubmit}>
        <Row>
            <Col xs="12" className='mb-2'>
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" onChange={ e => handleChange("text",e.target.value)} required value={form.text}/>
            </Col>
            <Col xs="12" className='mb-2 position-relative'>
                <Form.Label>Tags</Form.Label>
                <div className='form-control d-flex gap-1'>
                    <div className='d-flex flex-wrap gap-1'>
                        {form.tags.map( (tag,ind) => 
                            <span 
                                className="tag-note" 
                                key={ind}
                            >
                                {tag.name}
                                {console.log(tag)}
                                <span className='tag-remove' onClick={() => handleRemoveTag(tag)}>
                                    x
                                </span>
                            </span>
                        )}
                        <input 
                            type="text" 
                            className='form-input' 
                            placeholder={form.tags.length === 0 ? "Select tags" : ""} 
                            onChange={(e) => handleChange("search",e.target.value)} 
                            onFocus={handleOpenListTags} 
                            onBlur={handleCloseListTags}
                            value={form.search}
                        />
                    </div>
                </div>

                {tagsListOpen && 
                <div className='tags-list-container shadow py-3'>
                    <div className='p-2'>All tags</div>
                    <div className='tags-list'>
                        {tags
                        .filter( tag => !form.tags.includes(tag.name) && ((!!form.search && tag.name.toUpperCase().includes(form.search.toUpperCase())) || !form.search))
                        .slice(0,8)
                        .map((tag,ind) => <span className='p-2 tag-list-item' key={ind} onClick={() => handleChange("tags",tag)}>{tag.name}</span>)}
                        {!!form.search && <span className='p-2 tag-list-item' onClick={() => handleChange("tags",{name : form.search})}>{form.search} (New tag)</span>}
                    </div>
                </div>
                }
            </Col>
            <Col xs="12" className='mb-2'>
                <Button type='submit' variant='primary'>Save</Button>
            </Col>
        </Row>
    </Form>)
}