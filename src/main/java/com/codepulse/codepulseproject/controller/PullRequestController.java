package com.codepulse.codepulseproject.controller;

import com.codepulse.codepulseproject.model.PullRequestEntity;

import com.codepulse.codepulseproject.service.Repositories.PullRequestService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pull-requests")
public class PullRequestController
{
    private final PullRequestService pullRequestService;

    public PullRequestController(PullRequestService pullRequestService)
    {
        this.pullRequestService = pullRequestService;
    }

    @GetMapping
    public List<PullRequestEntity> getMyPullRequests(@AuthenticationPrincipal OAuth2User user)
    {
        // Get the username from the verified GitHub login.
        String owner = user.getAttribute("login");

        // Return only repositories owned by this user.
        return pullRequestService.getPullRequestsByOwner(owner);
    }
}