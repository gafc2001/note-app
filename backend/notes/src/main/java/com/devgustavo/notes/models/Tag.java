package com.devgustavo.notes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Note> notes;

}
