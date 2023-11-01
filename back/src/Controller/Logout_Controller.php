<?php

namespace App\Controller;

use App\Service\JWTBlacklistService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;

class Logout_Controller
{
    private JWTBlacklistService $blacklistService;
    private RequestStack $requestStack;

    public function __construct(JWTBlacklistService $blacklistService, RequestStack $requestStack)
    {
        $this->blacklistService = $blacklistService;
        $this->requestStack = $requestStack;
    }


  
    public function logout(): JsonResponse
    {
        $currentToken = $this->getCurrentJWT();

        if ($currentToken) {
            $this->blacklistService->addToBlacklist($currentToken);
        }

        

        return new JsonResponse(['message' => 'Déconnexion réussie.']);
    }

    private function getCurrentJWT(): ?string
    {
        $request = $this->requestStack->getCurrentRequest();

        if ($request && $request->headers->has('Authorization')) {
            $authorizationHeader = $request->headers->get('Authorization');
            $jwt = str_replace('Bearer ', '', $authorizationHeader);
            return $jwt;
        }

        return null;
    }
}