<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class MeController  extends AbstractController {

    private EntityManagerInterface $entityManager;

    public function __construct(private Security $security, EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route(path: '/api/users', name: 'users', methods: ['GET'])]
    public function getAllUsers(): Response
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findAll();

        return $this->json($users);
    }
   
    public function __invoke()
    {
        $user = $this->security->getUser();
        return $user;
    }

    

    
}