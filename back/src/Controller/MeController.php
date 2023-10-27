<?php

namespace App\Controller;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class MeController 
{
    public function __construct(private Security $security)
    {}

    public function __invoke()
    {
        $user = $this->security->getUser();
        return $user;
    }
}