package com.codepulse.codepulseproject.repository;

import com.codepulse.codepulseproject.model.RepositoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositoryStore extends JpaRepository<RepositoryEntity, Long>
{
    // Finds a saved repository by its GitHub ID; returns null if not found (Implementation by Spring Data).
    RepositoryEntity findByGithubId(Long githubId);

    // Finds all saved repositories owned by this user, ignoring capitalization (Implementation by Spring Data).
    List<RepositoryEntity> findAllByOwnerIgnoreCase(String owner);

}