package com.devgustavo.notes.repositories;

import com.devgustavo.notes.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long>, TagRepositoryCustom {


}
