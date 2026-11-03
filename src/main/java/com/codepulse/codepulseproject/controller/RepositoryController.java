package com.codepulse.codepulseproject.controller;

import com.codepulse.codepulseproject.model.RepositoryEntity;
import com.codepulse.codepulseproject.service.Repositories.RepositoryService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/repositories")
public class RepositoryController
{
    private final RepositoryService repositoryService;

    public RepositoryController(RepositoryService repositoryService)
    {
        this.repositoryService = repositoryService;
    }

    @GetMapping
    public List<RepositoryEntity> getMyRepositories(@AuthenticationPrincipal OAuth2User user)
    {
        // Get the username from the verified GitHub login.
        String owner = user.getAttribute("login");

        // Return only repositories owned by this user.
        return repositoryService.getRepositoriesByOwner(owner);
    }
}