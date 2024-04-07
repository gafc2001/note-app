package com.devgustavo.notes.repositories;

import com.devgustavo.notes.models.Tag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class TagRepositoryImpl implements TagRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Tag> findByName(String name) {
        Query query = entityManager.createQuery("select t from Tag t where t.name =:name",Tag.class);
        query.setParameter("name",name);
        List<Tag> tags = query.getResultList();
        if(tags.size() == 0){
            return Optional.empty();
        }
        return Optional.of(tags.getFirst());
    }

    @Override
    @Transactional
    public Tag findByNameOrCreate(String name) {
        Optional<Tag> matchTag = this.findByName(name);
        if(matchTag.isPresent()){
            return matchTag.get();
        }

        Tag newTag = new Tag();
        newTag.setName(name);
        entityManager.persist(newTag);
        return this.findByName(name).get();

    }
}
