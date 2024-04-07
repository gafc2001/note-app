package com.devgustavo.notes.controllers;

import com.devgustavo.notes.dto.ResponseHttp;
import com.devgustavo.notes.dto.TagDto;
import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import com.devgustavo.notes.services.TagService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TagController extends AbstractV1Controller{

    private final TagService tagService;
    public TagController(TagService tagService){
        this.tagService = tagService;
    }

    @GetMapping("tags")
    public List<Tag> getAllTags(){
        return tagService.getAllTags();
    }
    @PostMapping("notes/{id}/tags")
    public Tag addNoteTag(@PathVariable("id") Long noteId, @Valid @RequestBody TagDto tagDto){
        return tagService.addNoteTag(noteId,tagDto);
    }

    @PostMapping("notes/{noteId}/tags/{tagId}")
    public ResponseHttp removeTagFromNote(@PathVariable("noteId") Long noteId, @PathVariable("tagId") Long tagId){
        tagService.removeNoteTag(noteId,tagId);
        return new ResponseHttp();
    }
}
