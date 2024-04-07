package com.devgustavo.notes.dto;

import com.devgustavo.notes.models.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {

    @NotBlank(message = "name is required")
    private String name;

    public Tag getTag(){
        Tag tag = new Tag();
        tag.setName(name);
        return tag;
    }
}
