<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserGetController extends AbstractController {
        
        public function __invoke(User $user): User
        {
                $user = $this->getUser();
                
                return $user;
        }
}