package com.codepulse.codepulseproject.repository;

import com.codepulse.codepulseproject.model.AiReviewEntity;
import com.codepulse.codepulseproject.model.PullRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiReviewStore extends JpaRepository<AiReviewEntity, Long>
{
    AiReviewEntity findByPullRequestAndCommitSha(PullRequestEntity pullRequest, String commitSha);

    // Finds reviews whose PR's repository belongs to this owner (Implementation in Spring Data).
    List<AiReviewEntity> findAllByPullRequest_Repository_OwnerIgnoreCase(String owner);
}