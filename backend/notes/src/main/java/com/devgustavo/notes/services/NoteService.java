package com.devgustavo.notes.services;

import com.devgustavo.notes.dto.NoteDto;
import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import com.devgustavo.notes.repositories.INoteRepository;
import com.devgustavo.notes.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoteService {

    private final INoteRepository noteRepository;
    private final TagRepository tagRepository;
    public NoteService(INoteRepository noteRepository, TagRepository tagRepository){
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }

    public List<Note> getNotes(){
        return noteRepository.findAll();
    }

    public Note saveNote(NoteDto noteDto){
        Note note = noteDto.getNote();
        note.setIsActive(true);
        List<Tag> tags = note.getTags();

        List<Tag> createdTags = new ArrayList<Tag>();
        for(Tag tag : tags){
            Tag matchTag = tagRepository.findByNameOrCreate(tag.getName());
            createdTags.add(matchTag);
        }
        note.setTags(createdTags);
        return noteRepository.save(note);
    }

    public Note updateNoteText(Long id,Note newNote){
        Note note = noteRepository.findById(id).get();
        note.setText(newNote.getText());
        noteRepository.save(note);
        return note;
    }
}
