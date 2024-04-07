package com.devgustavo.notes.controllers;

import com.devgustavo.notes.dto.NoteDto;
import com.devgustavo.notes.dto.NoteResponseDto;
import com.devgustavo.notes.dto.ResponseHttp;
import com.devgustavo.notes.models.Note;
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
    public List<NoteResponseDto> getNotes(){
        return noteService.getNotes();
    }

    @PostMapping("notes")
    public ResponseHttp saveNote(@Valid  @RequestBody NoteDto noteDto){
        Note note = noteService.saveNote(noteDto);
        ResponseHttp response = new ResponseHttp();
        response.setData(note);
        return response;
    }



    @PostMapping("notes/{id}")
    public Note updateNoteText(@PathVariable("id") Long id,@RequestBody Note note){
        return noteService.updateNoteText(id,note);
    }

    @PostMapping("notes/{id}/delete")
    public ResponseHttp deleteNoteById(@PathVariable("id") Long id){
        noteService.deleteNoteById(id);
        ResponseHttp response = new ResponseHttp();
        response.setMessage("Note deleted");
        return response;
    }

    @PostMapping("notes/{id}/archive")
    public ResponseHttp archiveNoteById(@PathVariable("id") Long id){
        noteService.archiveNoteById(id);
        ResponseHttp response = new ResponseHttp();
        response.setMessage("Note updated");
        return response;
    }



}
