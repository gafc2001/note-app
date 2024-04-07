package com.devgustavo.notes.services;

import com.devgustavo.notes.dto.TagDto;
import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import com.devgustavo.notes.repositories.NoteRepository;
import com.devgustavo.notes.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagService {

    private final TagRepository tagRepository;
    private final NoteRepository noteRepository;

    public TagService(TagRepository tagRepository, NoteRepository noteRepository){
        this.tagRepository = tagRepository;
        this.noteRepository = noteRepository;
    }

    public List<Tag> getAllTags(){
        return tagRepository.findAll();
    }
    public Tag addNoteTag(Long noteId, TagDto tagDto){
        Note note = noteRepository.findById(noteId).get();
        Tag matchTag = tagRepository.findByNameOrCreate(tagDto.getName());


        List<Tag> currentTags = note.getTags();
        if(currentTags.contains(matchTag)){
            return matchTag;
        }
        currentTags.add(matchTag);
        note.setTags(currentTags);
        noteRepository.save(note);

        return matchTag;
    }

    public void removeNoteTag(Long noteId,Long tagId){

        Note note = noteRepository.findById(noteId).orElseThrow();
        Tag tag = tagRepository.findById(tagId).orElseThrow();
        note.getTags().remove(tag);
        noteRepository.save(note);

    }
}
