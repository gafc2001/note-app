package com.devgustavo.notes.controllers;

import com.devgustavo.notes.dto.TagDto;
import com.devgustavo.notes.models.Note;
import com.devgustavo.notes.models.Tag;
import com.devgustavo.notes.services.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TagController extends AbstractV1Controller{

    private final TagService tagService;
    public TagController(TagService tagService){
        this.tagService = tagService;
    }
    @PostMapping("notes/{id}/tags")
    public Tag addNoteTag(@PathVariable("id") Long noteId, @RequestBody TagDto tagDto){
        return tagService.addNoteTag(noteId,tagDto);
    }

    @DeleteMapping("notes/{noteId}/tags/{tagId}")
    public void removeTagFromNote(@PathVariable("noteId") Long noteId, @PathVariable("tagId") Long tagId){
        tagService.removeNoteTag(noteId,tagId);
    }
}
