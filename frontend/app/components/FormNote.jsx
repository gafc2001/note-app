
import { useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { httpClient } from '../services/httpClient';

const tags = [
    {
        id : 1,
        name : "Tag 1"
    },
    {
        id : 2,
        name : "Tag 2"
    },
    {
        id : 3,
        name : "Tag 3"
    },
    {
        id : 4,
        name : "Tag 4"
    },
    {
        id : 5,
        name : "Tag 5"
    },
    {
        id : 6,
        name : "Random"
    },
]
export const FormNote = ({afterSend}) => {
 
    const [form,setForm] = useState({
        text : "",
        search : "",
        tags : [],
    })
    const [validated,setValidated] = useState(false);
    const [tagsListOpen,setTagsListOpen] = useState(false);

    const handleChange = (name,value)=> {
        if(name === "tags"){
            value = [...form.tags,value];
        }
        setForm({
            ...form,
            search : "",
            [name] : value
        })
        
    }

    const handleOpenListTags = () => setTagsListOpen(true);
    const handleCloseListTags = () => {
        setForm({
            ...form,
            search : "",
        })
        setTimeout(() => setTagsListOpen(false),[100])
    }

    const handleRemoveTag = (tag) => {
        setForm({
            ...form,
            tags : form.tags.filter( tagI => tag !== tagI)
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (e.target.checkValidity() === false) {
            return
        }
        const response = await httpClient.post("api/v1/notes",form);
        console.log(response);
        if(response.status){
            afterSend(response.data);
        }
    }

    return (
    <Form validated={validated} noValidate onSubmit={handleSubmit}>
        <Row>
            <Col xs="12" className='mb-2'>
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" onChange={ e => handleChange("text",e.target.value)} required/>
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
                            {tag}
                            <span className='tag-remove' onClick={() => handleRemoveTag(tag)}>
                                x
                            </span>
                        </span>
                    )}
                    </div>
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

                {tagsListOpen && 
                <div className='tags-list-container shadow py-3'>
                    <div className='p-2'>All tags</div>
                    <div className='tags-list'>
                        {tags.filter( t => 
                            !form.tags.includes(t.name) && ((!!form.search && t.name.toUpperCase().includes(form.search.toUpperCase())) || !form.search)
                        ).map( (tag,ind) => 
                            <span className='p-2 tag-list-item' key={ind} onClick={() => handleChange("tags",tag.name)}>{tag.name}</span>
                        )}
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