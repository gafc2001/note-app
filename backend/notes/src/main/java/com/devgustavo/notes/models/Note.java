package com.devgustavo.notes.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Data
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    private String text;

    @Column(columnDefinition = "bit DEFAULT 1")
    private Boolean isActive;

    private String color;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "note_tags",
            joinColumns = @JoinColumn( name = "note_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @CreationTimestamp
    private Date createdAt;

    @PrePersist
    private void randomColor(){
        String[] defaultColor = new String[]{"#fe99ff","#fe9e9f","#92f48f","#fff599","#9ffffe","#c89dce"};
        Random rand = new Random();
        int index = rand.nextInt(defaultColor.length);
        setColor(defaultColor[index]);
    }


}
