package com.codepulse.codepulseproject.controller;

import com.codepulse.codepulseproject.model.PullRequestEntity;

import com.codepulse.codepulseproject.service.Repositories.PullRequestService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PullRequestController
{
    private final PullRequestService pullRequestService;

    public PullRequestController(PullRequestService pullRequestService)
    {
        this.pullRequestService = pullRequestService;
    }


    //Gets The Pull Requests from all the repos
    @GetMapping("/all-pull-requests")
    public List<PullRequestEntity> getMyPullRequests(@AuthenticationPrincipal OAuth2User user)
    {
        // Get the username from the verified GitHub login.
        String owner = user.getAttribute("login");

        // Return only repositories owned by this user.
        return pullRequestService.getPullRequestsByOwner(owner);
    }

    // Returns PRs from one selected repository owned by the logged-in user.
    @GetMapping("/repositories/{repositoryId}/pull-requests")
    public List<PullRequestEntity> getRepositoryPullRequests(@PathVariable("repositoryId") Long repositoryId, @AuthenticationPrincipal OAuth2User user)
    {
        String owner = user.getAttribute("login");

        return pullRequestService.getPullRequestsByRepository(repositoryId, owner);
    }




}