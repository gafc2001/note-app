package com.devgustavo.notes.repositories;

import com.devgustavo.notes.models.Tag;

import java.util.Optional;

public interface TagRepositoryCustom {

    Optional<Tag> findByName(String name);

    Tag findByNameOrCreate(String name);
}
