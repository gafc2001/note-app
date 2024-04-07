package com.devgustavo.notes.dto;

import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class NoteDto {

    @NotBlank(message = "The note text is require")
    private String text;

    private List<String> tags;

    public Note getNote(){
        Note note = new Note();
        note.setText(text);
        List<Tag> tagsArr = new ArrayList<Tag>();
        for(String textTag : tags){
            Tag tag = new Tag();
            tag.setName(textTag);
            tagsArr.add(tag);
        }
        note.setTags(tagsArr);
        return note;
    }
}
