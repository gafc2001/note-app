package com.devgustavo.notes.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String tag;

    @ManyToMany(mappedBy = "tags")
    private List<Note> notes;

}
