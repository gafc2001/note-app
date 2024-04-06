package com.devgustavo.notes.controllers;

import com.devgustavo.notes.dto.NoteDto;
import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import com.devgustavo.notes.repositories.INoteRepository;
import com.devgustavo.notes.services.NoteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController extends AbstractV1Controller{

    NoteService noteService;
    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    @GetMapping("notes")
    public List<Note> getNotes(){
        return noteService.getNotes();
    }

    @PostMapping("notes")
    public Note saveNote(@Valid  @RequestBody NoteDto noteDto){
        return noteService.saveNote(noteDto);
    }

    @PutMapping("notes/{id}")
    public Note updateNoteText(@PathVariable("id") Long id,@RequestBody Note note){
        return noteService.updateNoteText(id,note);
    }


}
