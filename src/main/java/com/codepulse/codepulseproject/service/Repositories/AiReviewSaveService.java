package com.codepulse.codepulseproject.service.Repositories;

import com.codepulse.codepulseproject.model.AiReviewEntity;
import com.codepulse.codepulseproject.model.PullRequestEntity;
import com.codepulse.codepulseproject.repository.AiReviewStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiReviewSaveService
{
    private final AiReviewStore aiReviewStore;

    public AiReviewSaveService(AiReviewStore aiReviewStore)
    {
        this.aiReviewStore = aiReviewStore;
    }

    public AiReviewEntity saveReview(PullRequestEntity pullRequest, String commitSha, String feedback)
    {
        // Search for a saved review of this PR and commit.
        AiReviewEntity existing = aiReviewStore.findByPullRequestAndCommitSha(pullRequest, commitSha);

        // Reuse the existing review if found.
        if (existing != null)
        {
            return existing;
        }

        // Otherwise, create and save a new review.
        AiReviewEntity newReview =
                new AiReviewEntity(pullRequest, commitSha, feedback);

        return aiReviewStore.save(newReview);
    }

    //Returns all the ai reviews the owner has
    public List<AiReviewEntity> getAiReviewsByOwner(String owner)
    {
        return aiReviewStore.findAllByPullRequest_Repository_OwnerIgnoreCase(owner);
    }

    //Returns all the ai reviews for specific Pull Request
    public List<AiReviewEntity> getAiReviewsByPullRequest(long id , String owner)
    {
        return aiReviewStore.findAllByPullRequest_IdAndPullRequest_Repository_OwnerIgnoreCase(id,owner);
    }




}