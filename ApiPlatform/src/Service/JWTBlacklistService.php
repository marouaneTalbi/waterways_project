<?php
namespace App\Service;

// Service de gestion de la liste noire des tokens JWT
class JWTBlacklistService
{
    private $blacklistedTokens = [];

    public function addToBlacklist($token)
    {
        $this->blacklistedTokens[] = $token;
    }

    public function isTokenBlacklisted($token)
    {
        return in_array($token, $this->blacklistedTokens);
    }
}
