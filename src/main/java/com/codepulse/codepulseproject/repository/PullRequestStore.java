package com.codepulse.codepulseproject.repository;

import com.codepulse.codepulseproject.model.PullRequestEntity;
import com.codepulse.codepulseproject.model.RepositoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PullRequestStore extends JpaRepository<PullRequestEntity, Long>
{
    PullRequestEntity findByRepositoryAndPrNumber(RepositoryEntity repository, int prNumber);

    // Finds PRs whose repository belongs to this owner.
    List<PullRequestEntity> findAllByRepository_OwnerIgnoreCase(String owner);

    // Finds PRs from one specific repository, provided it belongs to this owner.
    List<PullRequestEntity> findAllByRepository_IdAndRepository_OwnerIgnoreCase(Long repositoryId, String owner);
}