<?php

namespace App\Controller;
use Symfony\Component\Security\Core\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class UserGetController extends AbstractController {
    
    private SerializerInterface $serializer;
   
    public function __construct(Security $security, SerializerInterface $serializer)
    {
        $this->security = $security;
        $this->serializer = $serializer;
    }

    public function __invoke()
    {
        $user = $this->security->getUser();
        if (null === $user) {
            throw new AccessDeniedException('Cet utilisateur n\'est pas authentifié.');
        }
        return $user;
    }
}
