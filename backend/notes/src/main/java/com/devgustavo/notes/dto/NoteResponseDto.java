package com.devgustavo.notes.dto;

import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class NoteResponseDto {

    private Long id;

    private String text;

    private List<Tag> tags;

    private Boolean isActive;

    private String color;

    public static NoteResponseDto build(Note note){
        NoteResponseDto noteResponseDto = new NoteResponseDto();
        noteResponseDto.setId(note.getId());
        noteResponseDto.setText(note.getText());
        noteResponseDto.setIsActive(note.getIsActive());
        noteResponseDto.setColor(note.getColor());

        List<String> tags = new ArrayList<>();

        noteResponseDto.setTags(note.getTags());

        return noteResponseDto;
    }


}
