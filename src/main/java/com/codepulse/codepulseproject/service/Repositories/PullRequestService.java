package com.codepulse.codepulseproject.service.Repositories;


import com.codepulse.codepulseproject.model.PullRequestEntity;
import com.codepulse.codepulseproject.model.RepositoryEntity;
import com.codepulse.codepulseproject.repository.PullRequestStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PullRequestService
{
    private final PullRequestStore pullRequestStore;

    public PullRequestService(PullRequestStore pullRequestStore)
    {
        this.pullRequestStore = pullRequestStore;
    }

    public PullRequestEntity savePullRequest(RepositoryEntity repository , int prNumber, String prTitle,
                                             String state , String latestCommitSha)
    {
        // Find this PR within its repository.
        PullRequestEntity existing = pullRequestStore.findByRepositoryAndPrNumber(repository,prNumber);

        // If already saved, update its changing information.
        if(existing != null)
        {
            existing.updateDetails(prTitle,state,latestCommitSha);

            return pullRequestStore.save(existing);
        }

        PullRequestEntity newPr = new PullRequestEntity(repository,prNumber,prTitle,state,latestCommitSha);

        // Insert the new PR into PostgreSQL.
        return pullRequestStore.save(newPr);
    }


    // Loads PRs across all repositories belonging to this owner.
    public List<PullRequestEntity> getPullRequestsByOwner(String owner)
    {
        return pullRequestStore.findAllByRepository_OwnerIgnoreCase(owner);
    }


    // Loads PRs from the selected repository belonging to this owner.
    public List<PullRequestEntity> getPullRequestsByRepository(Long repositoryId, String owner)
    {
        return pullRequestStore.findAllByRepository_IdAndRepository_OwnerIgnoreCase(repositoryId, owner);
    }
}
